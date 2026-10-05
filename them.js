// Функция переключения темы
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    updateThemeButtonText();
}

// Обновление текста/иконки на кнопке (если она есть на странице)
function updateThemeButtonText() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        const isDark = document.body.classList.contains('dark-theme');
        themeBtn.textContent = isDark ? '☀️ Светлая тема' : '🌙 Ночная тема';
    }
}

// Применение темы ДО полной загрузки DOM (чтобы страница не "мигала" белым)
(function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
})();

// Привязка события после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    updateThemeButtonText();
    
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
});