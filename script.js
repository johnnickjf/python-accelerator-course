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
function initializeVideoPlayer() {
    const videoPlaceholder = document.getElementById('video-placeholder');
    const playButton = document.getElementById('play-button');
    
    if (!videoPlaceholder || !playButton) return;
    
    const videoId = 'gAjmKvZY_zA'; // ID do seu vídeo do YouTube
    
    // Verificar se a imagem da thumbnail existe
    const thumbnailImg = videoPlaceholder.querySelector('.video-thumbnail-img');
    
    // Se a imagem não carregar, mostrar fallback
    if (thumbnailImg) {
        thumbnailImg.onerror = function() {
            console.log('Erro ao carregar thumbnail local, usando fallback do YouTube');
            loadYouTubeThumbnail(videoId, videoPlaceholder);
        };
        
        // Verificar se a imagem carregou
        if (thumbnailImg.complete && thumbnailImg.naturalWidth === 0) {
            console.log('Thumbnail local não encontrada, usando fallback do YouTube');
            loadYouTubeThumbnail(videoId, videoPlaceholder);
        }
    } else {
        // Se não houver imagem local, carregar do YouTube
        loadYouTubeThumbnail(videoId, videoPlaceholder);
    }
    
    // Função para carregar thumbnail do YouTube como fallback
    function loadYouTubeThumbnail(videoId, container) {
        const thumbnailUrls = [
            `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        ];
        
        const thumbnailImg = new Image();
        thumbnailImg.className = 'video-thumbnail-img';
        thumbnailImg.alt = 'Thumbnail do vídeo sobre o curso Acelerador Python';
        thumbnailImg.loading = 'lazy';
        
        let currentUrlIndex = 0;
        
        function tryNextUrl() {
            if (currentUrlIndex < thumbnailUrls.length) {
                thumbnailImg.src = thumbnailUrls[currentUrlIndex];
                currentUrlIndex++;
            }
        }
        
        thumbnailImg.onload = function() {
            if (this.naturalWidth > 120 && this.naturalHeight > 90) {
                // Remover imagem existente (se houver)
                const existingImg = container.querySelector('.video-thumbnail-img');
                if (existingImg) {
                    existingImg.remove();
                }
                
                // Inserir antes do overlay
                const overlay = container.querySelector('.thumbnail-overlay');
                if (overlay) {
                    container.insertBefore(thumbnailImg, overlay);
                } else {
                    container.appendChild(thumbnailImg);
                }
            } else {
                tryNextUrl();
            }
        };
        
        thumbnailImg.onerror = tryNextUrl;
        
        tryNextUrl();
    }
    
    // Função para reproduzir o vídeo
    function playVideo() {
        // Criar iframe do YouTube
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        
        // Adicionar classe para indicar que o vídeo está tocando
        videoPlaceholder.classList.add('video-playing');
        
        // Limpar o placeholder e adicionar o iframe
        videoPlaceholder.innerHTML = '';
        videoPlaceholder.appendChild(iframe);
        
        // Atualizar mensagem abaixo do vídeo
        const videoContainer = videoPlaceholder.closest('.video-container');
        if (videoContainer) {
            const message = videoContainer.parentElement.querySelector('p');
            if (message) {
                message.innerHTML = '<strong>Agora você está assistindo:</strong> Veja como o Acelerador Python pode transformar sua produtividade em apenas 30 dias.';
            }
        }
        
        // Monitorar quando o vídeo terminar (API do YouTube)
        window.addEventListener('message', function(event) {
            if (event.data === 'ended' || (event.data && event.data.event === 'ended')) {
                resetVideoPlayer();
            }
        });
        
        // Adicionar botão para resetar o vídeo (para casos onde a API não funciona)
        setTimeout(() => {
            const resetBtn = document.createElement('button');
            resetBtn.className = 'reset-video-btn';
            resetBtn.innerHTML = '<i class="fas fa-redo"></i> Assistir novamente';
            resetBtn.style.position = 'absolute';
            resetBtn.style.bottom = '15px';
            resetBtn.style.left = '50%';
            resetBtn.style.transform = 'translateX(-50%)';
            resetBtn.style.backgroundColor = 'rgba(0,0,0,0.8)';
            resetBtn.style.color = 'white';
            resetBtn.style.border = 'none';
            resetBtn.style.padding = '10px 20px';
            resetBtn.style.borderRadius = '20px';
            resetBtn.style.cursor = 'pointer';
            resetBtn.style.zIndex = '5';
            resetBtn.style.fontSize = '0.9rem';
            
            resetBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                resetVideoPlayer();
            });
            
            videoPlaceholder.appendChild(resetBtn);
        }, 2000);
    }
    
    // Função para resetar o player
    function resetVideoPlayer() {
        // Limpar o placeholder
        videoPlaceholder.innerHTML = '';
        videoPlaceholder.classList.remove('video-playing');
        
        // Recriar a estrutura da thumbnail
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = 'images/video-thumbnail.jpg';
        thumbnailImg.className = 'video-thumbnail-img';
        thumbnailImg.alt = 'Thumbnail do vídeo sobre o curso Acelerador Python';
        thumbnailImg.onerror = function() {
            // Se a imagem local falhar, usar fallback do YouTube
            loadYouTubeThumbnail(videoId, videoPlaceholder);
        };
        
        const overlay = document.createElement('div');
        overlay.className = 'thumbnail-overlay';
        
        const playBtn = document.createElement('div');
        playBtn.className = 'play-button';
        playBtn.id = 'play-button';
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        // Adicionar elementos ao placeholder
        videoPlaceholder.appendChild(thumbnailImg);
        videoPlaceholder.appendChild(overlay);
        videoPlaceholder.appendChild(playBtn);
        
        // Reatribuir evento de clique
        playBtn.addEventListener('click', playVideo);
        videoPlaceholder.addEventListener('click', function(e) {
            if (e.target === videoPlaceholder || e.target === overlay) {
                playVideo();
            }
        });
        
        // Restaurar mensagem original
        const videoContainer = videoPlaceholder.closest('.video-container');
        if (videoContainer) {
            const message = videoContainer.parentElement.querySelector('p');
            if (message) {
                message.innerHTML = '<strong>Isso não é mágica, é Python.</strong> E a boa notícia? Você não precisa ser um gênio da matemática ou um programador experiente para usar isso a seu favor.';
            }
        }
        
        // Recarregar a thumbnail se necessário
        initializeVideoPlayer();
    }
    
    // Adicionar eventos de clique
    if (playButton) {
        playButton.addEventListener('click', playVideo);
    }
    
    videoPlaceholder.addEventListener('click', function(e) {
        if (e.target === videoPlaceholder || 
            e.target.classList.contains('thumbnail-overlay') || 
            e.target.classList.contains('video-thumbnail-img')) {
            playVideo();
        }
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
    // Garantir que o título do vídeo esteja branco
    const videoTitle = document.querySelector('.video-section .section-title h2');
    if (videoTitle) {
        videoTitle.style.color = 'white';
    }
    
    // Inicializar o player de vídeo
    initializeVideoPlayer();
});