// Mobile menu toggle
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    // Here you would normally send the form data to a server
    // For this example, we'll just show a success message
    alert(`Спасибо, ${name}! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.`);
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Log data to console (for demonstration)
    console.log('Форма отправлена:');
    console.log('Имя:', name);
    console.log('Email:', email);
    console.log('Тема:', subject);
    console.log('Сообщение:', message);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// Telegram Form Submission
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Показываем спиннер загрузки
    const submitBtn = event.target.querySelector('.btn-primary');
    const submitText = document.getElementById('submitText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const formMessage = document.getElementById('formMessage');
    
    submitText.style.display = 'none';
    loadingSpinner.style.display = 'inline-block';
    submitBtn.disabled = true;
    formMessage.style.display = 'none';
    
    // Собираем данные формы
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        date: new Date().toLocaleString('ru-RU')
    };
    
    try {
        // ВАЖНО: Замените эти значения на свои!
        const BOT_TOKEN = '8103393058:AAEzEvVwk39PPyT8uU9We9CeF4InHdCIFsQ'; // Ваш токен
        const CHAT_ID = '1098334245'; // Ваш Chat ID
        
        // Формируем сообщение для Telegram
        const telegramMessage = `
📩 *Новая заявка с сайта-портфолио!*

👤 *Имя:* ${formData.name}
📧 *Email:* ${formData.email}
📋 *Тема:* ${formData.subject || 'Не указана'}

💬 *Сообщение:*
${formData.message}

⏰ *Время отправки:* ${formData.date}
        `;
        
        // Отправляем запрос к API Telegram
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: telegramMessage,
                parse_mode: 'Markdown'
            })
        });
        
        const result = await response.json();
        
        if (result.ok) {
            // Успешная отправка
            showMessage('✅ Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.', 'success');
            document.getElementById('contactForm').reset();
        } else {
            // Ошибка от Telegram
            showMessage(`❌ Ошибка отправки: ${result.description || 'Неизвестная ошибка'}`, 'error');
            console.error('Telegram API Error:', result);
        }
        
    } catch (error) {
        // Ошибка сети или другая ошибка
        showMessage('❌ Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.', 'error');
        console.error('Network Error:', error);
    } finally {
        // Восстанавливаем кнопку
        submitText.style.display = 'inline-block';
        loadingSpinner.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Функция для показа сообщений
function showMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = text;
    formMessage.className = 'message-' + type;
    formMessage.style.display = 'block';
    
    // Прячем сообщение через 5 секунд
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}