// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');

        // Fecha todas as outras respostas
        document.querySelectorAll('.faq-answer').forEach(item => {
            if (item !== answer) {
                item.classList.remove('active');
            }
        });

        // Alterna ícones de todas as outras perguntas
        document.querySelectorAll('.faq-question i').forEach(item => {
            if (item !== icon) {
                item.className = 'fas fa-chevron-down';
            }
        });

        // Alterna a resposta atual
        answer.classList.toggle('active');

        // Alterna o ícone
        if (answer.classList.contains('active')) {
            icon.className = 'fas fa-chevron-up';
        } else {
            icon.className = 'fas fa-chevron-down';
        }
    });
});

// Module Accordion
const moduleHeaders = document.querySelectorAll('.module-header');

moduleHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('i');

        // Alterna o conteúdo do módulo
        content.classList.toggle('active');

        // Alterna o ícone
        if (content.classList.contains('active')) {
            icon.className = 'fas fa-chevron-up';
        } else {
            icon.className = 'fas fa-chevron-down';
        }
    });
});

// Countdown Timer - CORRIGIDO
let countdownEnded = false;

function updateCountdown() {
    if (countdownEnded) return;

    // Definir a data de término (24 horas a partir de agora)
    const now = new Date().getTime();
    const endTime = localStorage.getItem('countdownEndTime');

    let targetTime;

    if (!endTime) {
        // Se não há tempo salvo, definir para 24 horas a partir de agora
        targetTime = now + (24 * 60 * 60 * 1000);
        localStorage.setItem('countdownEndTime', targetTime);
    } else {
        targetTime = parseInt(endTime);
    }

    const timeLeft = targetTime - now;

    if (timeLeft <= 0) {
        // Tempo esgotado - alterar preço e texto do botão
        document.getElementById('main-price').textContent = 'R$ 297,00';
        document.getElementById('main-installments').textContent = 'ou 12x de R$ 29,70';
        document.getElementById('cta-price').textContent = 'R$ 297,00';
        document.getElementById('cta-installments').textContent = 'ou 12x de R$ 29,70';
        document.getElementById('cta-button').textContent = 'COMPRAR AGORA POR R$ 297,00';
        document.getElementById('final-cta-button').textContent = 'COMPRAR AGORA POR R$ 297,00';

        // Parar o contador
        countdownEnded = true;
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Atualizar os elementos do contador
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    document.getElementById('days2').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours2').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes2').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds2').textContent = seconds.toString().padStart(2, '0');
}

// Iniciar o contador
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Chamar imediatamente para evitar atraso inicial

// Simular visualizadores ativos - CORRIGIDO
function updateViewers() {
    const baseViewers = 20;
    const randomViewers = Math.floor(Math.random() * 15) + 1; // Entre 1 e 15
    const totalViewers = baseViewers + randomViewers;

    document.getElementById('viewers-count').textContent = totalViewers;
    document.getElementById('viewers-count2').textContent = totalViewers;
}

setInterval(updateViewers, 5000); // Atualizar a cada 5 segundos
updateViewers(); // Chamar imediatamente

// Smooth Scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Fechar menu mobile se estiver aberto
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Função para rolar até a seção CTA
function scrollToCTA() {
    const ctaSection = document.getElementById('cta');
    if (ctaSection) {
        window.scrollTo({
            top: ctaSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Botões de CTA - Redirecionar para página de checkout
document.getElementById('cta-button').addEventListener('click', function (e) {
    e.preventDefault();
    // Aqui você redirecionaria para a página de checkout
    alert('Redirecionando para a página de pagamento...');
    // window.location.href = 'https://seusite.com/checkout';
});

document.getElementById('final-cta-button').addEventListener('click', function (e) {
    e.preventDefault();
    // Aqui você redirecionaria para a página de checkout
    alert('Redirecionando para a página de pagamento...');
    // window.location.href = 'https://seusite.com/checkout';
});

// Video Placeholder Click
document.querySelector('.video-placeholder').addEventListener('click', function () {
    alert('Abrindo vídeo de apresentação do curso...');
    // Aqui você implementaria a abertura do vídeo real
});

// Animações ao rolar
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('show');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
// Executar uma vez ao carregar a página
window.addEventListener('load', animateOnScroll);