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

// Countdown Timer - COM LINK ALTERADO APÓS EXPIRAR
let countdownEnded = false;
let promoLink = 'https://pay.kiwify.com.br/k9xHqNV'; // Link inicial
let expiredLink = 'https://pay.kiwify.com.br/8LLeOKc'; // Link após expirar

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
        // TEMPO ESGOTADO - VALORES CORRIGIDOS
        document.getElementById('main-price').textContent = 'R$ 197,00';
        document.getElementById('main-installments').textContent = 'ou 12x de R$ 20,37'; // CORRIGIDO
        document.getElementById('cta-price').textContent = 'R$ 197,00';
        document.getElementById('cta-installments').textContent = 'ou 12x de R$ 20,37'; // CORRIGIDO
        document.getElementById('cta-button').textContent = 'COMPRAR AGORA POR R$ 197,00';
        document.getElementById('final-cta-button').textContent = 'COMPRAR AGORA POR R$ 197,00';
        
        // Alterar os links dos botões de compra
        promoLink = expiredLink;
        // document.getElementById('cta-button').href = promoLink;
        document.getElementById('final-cta-button').href = promoLink;

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

// Simular visualizadores ativos
function updateViewers() {
    const baseViewers = 3;
    const randomViewers = Math.floor(Math.random() * 15) + 1; // Entre 1 e 15
    const totalViewers = baseViewers + randomViewers;

    document.getElementById('viewers-count').textContent = totalViewers;
    document.getElementById('viewers-count2').textContent = totalViewers;
}

setInterval(updateViewers, 10000); // Atualizar a cada 10 segundos
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

// Botões de CTA - Redirecionar para página de checkout (link atualizado dinamicamente)
// document.getElementById('cta-button').addEventListener('click', function (e) {
//     e.preventDefault();
//     window.location.href = promoLink;
// });

document.getElementById('final-cta-button').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = promoLink;
});

// ===== NOVO CÓDIGO PARA THUMBNAIL DO VÍDEO =====
function loadVideoThumbnail() {
    const videoPlaceholder = document.getElementById('video-placeholder');
    if (!videoPlaceholder) return;
    
    // ID do seu vídeo do YouTube (substitua se necessário)
    const videoId = 'gAjmKvZY_zA';
    
    // URLs da thumbnail do YouTube (tentamos a melhor qualidade primeiro)
    const thumbnailUrls = [
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, // Máxima resolução
        `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,    // Padrão SD
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`     // Alta qualidade
    ];
    
    // Criar elemento da imagem
    const thumbnailImg = new Image();
    thumbnailImg.className = 'video-thumbnail';
    thumbnailImg.alt = 'Thumbnail do vídeo sobre o curso Acelerador Python';
    thumbnailImg.loading = 'lazy';
    
    // Função para tentar carregar a próxima URL se falhar
    let currentUrlIndex = 0;
    
    function tryNextUrl() {
        if (currentUrlIndex < thumbnailUrls.length) {
            thumbnailImg.src = thumbnailUrls[currentUrlIndex];
            currentUrlIndex++;
        }
    }
    
    // Quando a imagem carregar com sucesso
    thumbnailImg.onload = function() {
        // Verificar se a imagem é válida (não é a imagem de fallback do YouTube)
        if (this.naturalWidth > 120 && this.naturalHeight > 90) {
            // Adicionar a imagem ao placeholder
            videoPlaceholder.appendChild(thumbnailImg);
            console.log('Thumbnail carregada com sucesso:', this.src);
        } else {
            // Se a imagem for muito pequena (provavelmente fallback), tentar próxima
            tryNextUrl();
        }
    };
    
    // Se der erro ao carregar a imagem
    thumbnailImg.onerror = tryNextUrl;
    
    // Começar a tentar carregar
    tryNextUrl();
    
    // Adicionar o botão de play (sempre presente)
    const playButton = document.createElement('div');
    playButton.className = 'play-button';
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    videoPlaceholder.appendChild(playButton);
    
    // Evento de clique para reproduzir o vídeo
    videoPlaceholder.addEventListener('click', function playVideo() {
        // Criar iframe do YouTube
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.borderRadius = 'var(--border-radius)';
        
        // Limpar o placeholder e adicionar o iframe
        videoPlaceholder.innerHTML = '';
        videoPlaceholder.appendChild(iframe);
        videoPlaceholder.classList.add('video-playing');
        
        // Atualizar mensagem abaixo do vídeo
        const videoContainer = videoPlaceholder.closest('.video-container');
        if (videoContainer) {
            const message = videoContainer.parentElement.querySelector('p');
            if (message) {
                message.innerHTML = '<strong>Agora você está assistindo:</strong> Veja como o Acelerador Python pode transformar sua produtividade em apenas 30 dias.';
            }
        }
        
        // Remover o evento de clique para evitar múltiplos iframes
        videoPlaceholder.removeEventListener('click', playVideo);
    });
}

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

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Garantir que os preços iniciais estejam corretos
    function initializePrices() {
        const installmentsElements = document.querySelectorAll('.price-installments');
        installmentsElements.forEach(el => {
            if (el.textContent.includes('9,70')) {
                el.textContent = el.textContent.replace('9,70', '10,03');
            }
        });
    }
    
    initializePrices();
    
    // Garantir que o título do vídeo esteja branco
    const videoTitle = document.querySelector('.video-section .section-title h2');
    if (videoTitle) {
        videoTitle.style.color = 'white';
    }
    
    // Carregar a thumbnail do vídeo
    loadVideoThumbnail();
});