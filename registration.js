 function goToStep2() {
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');

    if (!fullName || !email || !fullName.value.trim() || !email.value.trim()) {
        alert("Заполните личные данные!");
        return;
    }
    
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    
    document.getElementById('st1').classList.remove('active');
    document.getElementById('st2').classList.add('active');
}

function goToStep1() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    
    document.getElementById('st2').classList.remove('active');
    document.getElementById('st1').classList.add('active');
}

   async function processForm(e) {
        e.preventDefault();

        // Собираем данные формы
        const formData = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            passport: document.getElementById('passport').value,
            serviceType: document.getElementById('serviceType').value,
            region: document.getElementById('region').value
        };

        try {
            // Отправляем данные на Node.js бэкенд
            const response = await fetch('http://localhost:3000/api/register-and-apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                // Сохраняем email в браузер для идентификации сессии в личном кабинете
                localStorage.setItem('currentUserEmail', formData.email);
                alert(`Успешно! Пользователь и заявка ${result.appNumber} сохранены в MySQL.`);
                window.location.href = "application.html";
            } else {
                alert('Ошибка: ' + result.error);
            }
        } catch (err) {
            console.error('Ошибка запроса:', err);
            alert('Не удалось связаться с бэкенд-сервером (проверьте, запущен ли node server.js)');
        }
    }

    // Языковая поддержка
    const dict = {
        ru: {
            title: "Миграционная служба РТ", m_home: "Главная", m_reg: "Подача заявки", m_apps: "Личный кабинет",
            s1: "1. Аккаунт заявителя", s2: "2. Данные для регистрации", acc_title: "Создание личного кабинета",
            lbl_fullname: "ФИО полностью *", lbl_phone: "Номер телефона *", lbl_email: "Email адрес *",
            lbl_pass: "Придумайте пароль *", btn_next: "Далее к заявке ➔", app_title: "Оформление миграционной заявки",
            lbl_passport: "Серия и номер паспорта *", lbl_service: "Вид услуги *", lbl_region: "Регион пребывания *",
            btn_back: "◄ Назад", btn_submit: "Зарегистрироваться и отправить ➔"
        },
        tj: {
            title: "Хизмати муҳоҷирати ҶТ", m_home: "Асосӣ", m_reg: "Пешниҳоди ариза", m_apps: "Кабинети шахсӣ",
            s1: "1. Ҳисоби аризадиҳанда", s2: "2. Маълумот барои ариза", acc_title: "Сохтани кабинети шахсӣ",
            lbl_fullname: "Н-Н-О пурра *", lbl_phone: "Рақами телефон *", lbl_email: "Почтаи электронӣ *",
            lbl_pass: "Рамз созед *", btn_next: "Идома додан ➔", app_title: "Расмиятдарории ариза",
            lbl_passport: "Силсила ва рақами паспорт *", lbl_service: "Намуди хизматрасонӣ *", lbl_region: "Минтақа *",
            btn_back: "◄ Ба қафо", btn_submit: "Равон кардан ➔"
        },
        en: {
            title: "Migration Service RT", m_home: "Home", m_reg: "Apply Now", m_apps: "Dashboard",
            s1: "1. Account", s2: "2. Application Data", acc_title: "Create Account",
            lbl_fullname: "Full Name *", lbl_phone: "Phone Number *", lbl_email: "Email *",
            lbl_pass: "Create Password *", btn_next: "Next to Application ➔", app_title: "Migration Registration",
            lbl_passport: "Passport Number *", lbl_service: "Service Type *", lbl_region: "Region *",
            btn_back: "◄ Back", btn_submit: "Register & Submit ➔"
        }
    };

    function setLang(lang) {
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const k = el.getAttribute('data-lang-key');
            if(dict[lang][k]) el.innerText = dict[lang][k];
        });
    }