// Простая логика формы — открывает почтовый клиент с заполненными полями
function handleForm(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = encodeURIComponent('Сообщение с портфолио от ' + name);
    const body = encodeURIComponent('Имя: ' + name + 'Email: ' + email + ' ' + message);
    window.location.href = 'mailto:bondatsm2009@gmail.com?subject=' + subject + '&body=' + body;
    return false;
}

// Бургер для мобильного меню
const burger = document.getElementById('burger');
const nav = document.getElementById('topNav');
burger.addEventListener('click', ()=> nav.classList.toggle('open'));

// Автоматически вставляем текущий год
document.getElementById('year').textContent = new Date().getFullYear();