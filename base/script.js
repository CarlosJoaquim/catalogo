// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const catalogoGrid = document.getElementById('catalogo-grid');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Array para armazenar as imagens
    let images = [];
    let currentImageIndex = 0;

    // Carregar imagens do catálogo
    function loadCatalogImages() {
        // Adicionar loading state
        catalogoGrid.innerHTML = `
            <div class="loading">
                <div class="loading-spinner"></div>
                <p>Carregando catálogo...</p>
            </div>
        `;

        // Simular carregamento das imagens (substitua pelo seu caminho real)
        setTimeout(() => {
            images = [];
            
            // Gerar array de imagens de 1 a 25
            for (let i = 1; i <= 25; i++) {
                images.push({
                    src: `img/base/${i}.jpg`,
                    modelo: `Modelo ${i.toString().padStart(2, '0')}`,
                    alt: `Jogo Americano Modelo ${i.toString().padStart(2, '0')}`
                });
            }
            
            renderCatalog();
        }, 1000);
    }

    // Renderizar o catálogo
    function renderCatalog() {
        catalogoGrid.innerHTML = '';
        
        images.forEach((image, index) => {
            const catalogItem = document.createElement('div');
            catalogItem.className = 'catalogo-item';
            catalogItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" class="catalogo-image" data-index="${index}">
                <div class="catalogo-info">
                    <div class="modelo">${image.modelo}</div>
                </div>
            `;
            catalogoGrid.appendChild(catalogItem);
        });

        // Adicionar event listeners para as imagens
        addImageEventListeners();
    }

    // Adicionar event listeners para as imagens do catálogo
    function addImageEventListeners() {
        const catalogImages = document.querySelectorAll('.catalogo-image');
        
        catalogImages.forEach(img => {
            img.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                openModal(index);
            });

            // Tratar erro de carregamento de imagem
            img.addEventListener('error', function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDI4MCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNDAgODBDMTExLjIgODAgODggMTAzLjIgODggMTMyQzg4IDE2MC44IDExMS4yIDE4NCAxNDAgMTg0QzE2OC44IDE4NCAxOTIgMTYwLjggMTkyIDEzMkMxOTIgMTAzLjIgMTY4LjggODAgMTQwIDgwWiIgc3Ryb2tlPSIjQzRDMEMwIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTE0MCAxMjBMMTYwIDE0MEwxMjAgMTQwTDE0MCAxMjBaIiBmaWxsPSIjQzRDMEMwIi8+CjxwYXRoIGQ9Ik0xMDAgMjA4TDE4MCAyMDgiIHN0cm9rZT0iI0M0QzBDMCIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjQzRDMEMwIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0iQXJpYWwiPkltYWdlbSBuw6NvIGVuY29udHJhZGE8L3RleHQ+Cjwvc3ZnPgo=';
                this.alt = 'Imagem não encontrada';
            });
        });
    }

    // Abrir modal com imagem
    function openModal(index) {
        currentImageIndex = index;
        const image = images[currentImageIndex];
        
        modalImage.src = image.src;
        modalImage.alt = image.alt;
        
        imageModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Atualizar estado dos botões de navegação
        updateNavButtons();
    }

    // Fechar modal
    function closeImageModal() {
        imageModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Navegar para imagem anterior
    function prevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            modalImage.src = images[currentImageIndex].src;
            modalImage.alt = images[currentImageIndex].alt;
            updateNavButtons();
        }
    }

    // Navegar para próxima imagem
    function nextImage() {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            modalImage.src = images[currentImageIndex].src;
            modalImage.alt = images[currentImageIndex].alt;
            updateNavButtons();
        }
    }

    // Atualizar estado dos botões de navegação
    function updateNavButtons() {
        prevBtn.style.opacity = currentImageIndex === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentImageIndex === 0 ? 'not-allowed' : 'pointer';
        
        nextBtn.style.opacity = currentImageIndex === images.length - 1 ? '0.5' : '1';
        nextBtn.style.cursor = currentImageIndex === images.length - 1 ? 'not-allowed' : 'pointer';
    }

    // Menu mobile toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animar hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    // Fechar menu ao clicar em um link
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    // Navegação suave para âncoras
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Fechar menu mobile se estiver aberto
                    closeMobileMenu();
                }
            });
        });
    }

    // Adicionar efeito de scroll no header
    function initHeaderScroll() {
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--primary-black)';
                header.style.backdropFilter = 'none';
            }
            
            // Esconder/mostrar header no scroll
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = window.scrollY;
        });
    }

    // Preload de imagens para melhor performance
    function preloadImages() {
        images.forEach(image => {
            const img = new Image();
            img.src = image.src;
        });
    }

    // Inicializar todas as funcionalidades
    function init() {
        loadCatalogImages();
        initSmoothScroll();
        initHeaderScroll();

        // Event Listeners
        closeModal.addEventListener('click', closeImageModal);
        prevBtn.addEventListener('click', prevImage);
        nextBtn.addEventListener('click', nextImage);
        hamburger.addEventListener('click', toggleMobileMenu);

        // Fechar modal ao clicar fora da imagem
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });

        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Navegação por teclado
        document.addEventListener('keydown', function(e) {
            if (imageModal.classList.contains('show')) {
                if (e.key === 'Escape') closeImageModal();
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'ArrowRight') nextImage();
            }
        });

        // Swipe para mobile no modal
        let touchStartX = 0;
        let touchEndX = 0;

        modalImage.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        modalImage.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextImage(); // Swipe para esquerda
                } else {
                    prevImage(); // Swipe para direita
                }
            }
        }
    }

    // Inicializar quando o DOM estiver pronto
    init();
});

// Adicionar CSS para o estado ativo do hamburger
const style = document.createElement('style');
style.textContent = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            transition: left 0.3s ease;
        }
    }
`;
document.head.appendChild(style);