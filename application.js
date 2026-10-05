// Функция для подстановки цветных статусов
function getStatusBadge(status) {
    const s = (status || '').toLowerCase();
    if (s === 'одобрено' || s === 'approved') {
        return `<span class="badge badge-approved">Одобрено</span>`;
    } else if (s === 'отклонено' || s === 'rejected') {
        return `<span class="badge badge-rejected">Отклонено</span>`;
    } else {
        return `<span class="badge badge-pending">На проверке</span>`;
    }
}

// Загрузка данных при старте
window.onload = async function() {
    const userEmail = localStorage.getItem('currentUserEmail');

    if (!userEmail) {
        document.getElementById('profileCard').innerHTML = `
            <h2>Вы еще не авторизованы</h2>
            <p style="margin-top: 8px; color: var(--text-muted);">Зарегистрируйтесь или войдите в систему для работы с базой данных.</p>
            <a href="registration.html" style="display:inline-block; margin-top:12px; color: var(--accent-red); font-weight:bold;">Перейти к регистрации ➔</a>
        `;
        document.getElementById('appList').innerHTML = '<p style="color:var(--text-muted);">Заявки отсутствуют.</p>';
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/api/user-data?email=${encodeURIComponent(userEmail)}`);
        const data = await res.json();

        if (data.success) {
            document.getElementById('userName').innerText = `${data.user.full_name} | ${data.user.email} | ${data.user.phone || 'Телефон не указан'}`;

            const appContainer = document.getElementById('appList');
            if (data.applications.length === 0) {
                appContainer.innerHTML = '<p style="color:var(--text-muted);">У вас пока нет активных заявок в базе данных.</p>';
            } else {
                appContainer.innerHTML = data.applications.map(app => `
                    <div class="app-item">
                        <div class="app-header">
                            <strong>№ ${app.app_number}</strong>
                            ${getStatusBadge(app.status)}
                        </div>
                        <p style="font-size: 13px;"><strong>Услуга:</strong> ${app.service_type}</p>
                        <p style="font-size: 13px;"><strong>Регион:</strong> ${app.region}</p>
                        <p style="font-size: 12px; color: var(--text-muted); margin-top:4px;">Дата записи в БД: ${new Date(app.created_at).toLocaleString()}</p>
                        
                        <div class="notification-box">
                            🔔 <strong>Уведомление:</strong> ${app.notification}
                        </div>
                    </div>
                `).join('');
            }
        }
    } catch (err) {
        console.error('Ошибка загрузки данных из БД:', err);
    }
};

// Логика кнопки "Выйти"
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUserEmail');
            localStorage.removeItem('user');
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
    }
});

// Логика AI-помощника
function sendMsg() {
    const inp = document.getElementById('chatInp');
    const text = inp.value.trim();
    if(!text) return;

    const msgs = document.getElementById('chatMsgs');
    msgs.innerHTML += `<div class="msg user">${text}</div>`;
    inp.value = '';

    setTimeout(() => {
        let reply = "Для уточнения детальной информации вы можете воспользоваться разделом подача заявки.";
        const t = text.toLowerCase();
        if(t.includes("срок") || t.includes("дней")) {
            reply = "Согласно Законодательству РТ, временная регистрация оформляется в течение 10 рабочих дней с момента въезда.";
        } else if(t.includes("статус") || t.includes("проверка")) {
            reply = "Статус вашей заявки обновляется в режиме реального времени в блоке 'Мои Заявки'.";
        } else if(t.includes("документ") || t.includes("паспорт")) {
            reply = "Для подачи заявки требуется скан паспорта и адрес места временного пребывания.";
        }

        msgs.innerHTML += `<div class="msg bot">${reply}</div>`;
        msgs.scrollTop = msgs.scrollHeight;
    }, 600);
}