const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const crypto = require('crypto'); // Встроенный модуль Node.js (не нужен npm install!)

const app = express();
app.use(cors());
app.use(express.json());

const path = require('path');

// Указываем, что статические файлы (HTML, CSS, JS) находятся на уровень выше
app.use(express.static(path.join(__dirname, '..')));

const dbConfig = {
    host: 'localhost',
    user: 'root',      
    password: 'root',   
    database: 'migration_system'
};

// Хелперы для хэширования паролей без сторонних библиотек
function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
            if (err) reject(err);
            resolve(`${salt}:${derivedKey.toString('hex')}`);
        });
    });
}

function verifyPassword(password, storedHash) {
    return new Promise((resolve, reject) => {
        // Если пароль в базе еще старый (без хэша/двоеточия), делаем обычное сравнение
        if (!storedHash || !storedHash.includes(':')) {
            return resolve(password === storedHash);
        }
        
        const [salt, key] = storedHash.split(':');
        crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
            if (err) reject(err);
            resolve(key === derivedKey.toString('hex'));
        });
    });
}

// 1. РЕГИСТРАЦИЯ + СОЗДАНИЕ ЗАЯВКИ (с хэшированием пароля)
app.post('/api/register-and-apply', async (req, res) => {
    const { fullName, email, phone, password, passport, serviceType, region } = req.body;

    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        await connection.beginTransaction();

        // Проверяем существование пользователя
        const [existing] = await connection.execute('SELECT id FROM users WHERE email = ?', [email]);
        let userId;

        if (existing.length > 0) {
            userId = existing[0].id;
        } else {
            // Записываем пользователя с защищенным паролем
            const hashedPassword = await hashPassword(password);
            const [userResult] = await connection.execute(
                'INSERT INTO users (full_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)',
                [fullName, email, phone || null, hashedPassword, 'applicant']
            );
            userId = userResult.insertId;
        }

        const appNumber = 'TJ-' + Math.floor(100000 + Math.random() * 900000);
        const defaultNotification = 'Заявка принята в базу данных ведомства и направлена на проверку.';

        // Записываем заявку
        await connection.execute(
            'INSERT INTO applications (app_number, user_id, passport, service_type, region, notification) VALUES (?, ?, ?, ?, ?, ?)',
            [appNumber, userId, passport || '', serviceType || 'Регистрация', region || 'Душанбе', defaultNotification]
        );

        await connection.commit();
        res.json({ success: true, message: 'Успешно!', userId, appNumber });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error('ПОДРОБНАЯ ОШИБКА MYSQL:', error);
        res.status(500).json({ success: false, error: 'Ошибка при сохранении данных в БД' });
    } finally {
        if (connection) await connection.end();
    }
});

// 2. ВХОД В ЛИЧНЫЙ КАБИНЕТ (АВТОРИЗАЦИЯ)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [users] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        await connection.end();

        if (users.length > 0) {
            const user = users[0];
            const isMatch = await verifyPassword(password, user.password);

            if (isMatch) {
                res.json({ success: true, user });
            } else {
                res.status(401).json({ success: false, error: 'Неверный email или пароль' });
            }
        } else {
            res.status(401).json({ success: false, error: 'Неверный email или пароль' });
        }
    } catch (error) {
        console.error('Ошибка входа:', error);
        res.status(500).json({ success: false, error: 'Ошибка сервера' });
    }
});

// 3. ПОЛУЧЕНИЕ ДАННЫХ ДЛЯ ЛИЧНОГО КАБИНЕТА
app.get('/api/user-data', async (req, res) => {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: 'Email обязателен' });

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [users] = await connection.execute('SELECT id, full_name, email, phone FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            await connection.end();
            return res.json({ success: false, message: 'Пользователь не найден' });
        }

        const user = users[0];
        const [apps] = await connection.execute('SELECT * FROM applications WHERE user_id = ? ORDER BY created_at DESC', [user.id]);
        
        await connection.end();
        res.json({ success: true, user, applications: apps });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// 4. Вход исключительно для администраторов
app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        const [users] = await connection.execute(
            'SELECT * FROM users WHERE email = ? AND role = "admin"',
            [email]
        );
        await connection.end();

        if (users.length > 0) {
            const user = users[0];
            const isMatch = await verifyPassword(password, user.password);

            if (isMatch) {
                res.json({ success: true, user });
            } else {
                res.status(403).json({ success: false, error: 'Доступ запрещен. Неверный пароль.' });
            }
        } else {
            res.status(403).json({ success: false, error: 'Доступ запрещен. Учетная запись не является администратором.' });
        }
    } catch (error) {
        console.error('Ошибка входа админа:', error);
        res.status(500).json({ success: false, error: 'Ошибка сервера' });
    }
});

// 5. Получение ВСЕХ заявок всех пользователей (для админ-панели)
app.get('/api/admin/applications', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [apps] = await connection.execute(`
            SELECT 
                a.id AS app_id,
                a.app_number,
                a.passport,
                a.service_type,
                a.region,
                a.status,
                a.notification,
                a.created_at,
                u.full_name AS applicant_name,
                u.email AS applicant_email,
                u.phone AS applicant_phone
            FROM applications a
            JOIN users u ON a.user_id = u.id
            ORDER BY a.created_at DESC
        `);
        await connection.end();

        res.json({ success: true, applications: apps });
    } catch (error) {
        console.error('Ошибка получения всех заявок:', error);
        res.status(500).json({ success: false, error: 'Ошибка сервера' });
    }
});

// 6. Обновление СТАТУСА заявки
app.patch('/api/admin/applications/:id/status', async (req, res) => {
    const appId = req.params.id;
    const { status, notification } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(
            'UPDATE applications SET status = ?, notification = ? WHERE id = ?',
            [status, notification || '', appId]
        );
        await connection.end();

        res.json({ success: true, message: 'Статус заявки успешно обновлен' });
    } catch (error) {
        console.error('Ошибка обновления статуса:', error);
        res.status(500).json({ success: false, error: 'Не удалось обновить статус' });
    }
});

app.listen(3000, () => console.log('Бэкенд запущен на http://localhost:3000'));