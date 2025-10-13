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
    
    // Filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Arrays para armazenar os itens
    let images = [];
    let videos = [];
    let currentItems = [];
    let currentItemIndex = 0;
    let currentMediaType = ''; // 'images' ou 'videos'

    // Carregar itens do catálogo
    function loadCatalogItems() {
        // Adicionar loading state
        catalogoGrid.innerHTML = `
            <div class="loading">
                <div class="loading-spinner"></div>
                <p>Carregando catálogo...</p>
            </div>
        `;

        // Simular carregamento dos itens
        setTimeout(() => {
            // Carregar imagens (1.jpg a 20.jpg)
            images = [];
            for (let i = 1; i <= 22; i++) {
                images.push({
                    type: 'image',
                    src: `img/base/${i}.jpg`,
                    modelo: `Modelo ${i.toString().padStart(2, '0')}`,
                    alt: `Jogo Americano Modelo ${i.toString().padStart(2, '0')}`
                });
            }
            
            // Carregar vídeos (1.mp4 a 20.mp4)
            videos = [];
            for (let i = 1; i <= 20; i++) {
                videos.push({
                    type: 'video',
                    src: `video/${i}.mp4`,
                    poster: `img/base/${i}.jpg`,
                    modelo: `Modelo ${i.toString().padStart(2, '0')}`,
                    alt: `Jogo Americano Modelo ${i.toString().padStart(2, '0')}`
                });
            }
            
            // Mostrar imagens por padrão
            showImages();
        }, 1000);
    }

    // Mostrar apenas imagens
    function showImages() {
        currentItems = images;
        currentMediaType = 'images';
        renderCatalog('image');
        updateActiveFilter('images');
    }

    // Mostrar apenas vídeos
    function showVideos() {
        currentItems = videos;
        currentMediaType = 'videos';
        renderCatalog('video');
        updateActiveFilter('videos');
    }

    // Atualizar filtro ativo
    function updateActiveFilter(activeType) {
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === activeType) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Renderizar o catálogo baseado no tipo
    function renderCatalog(type) {
        catalogoGrid.innerHTML = '';
        
        if (currentItems.length === 0) {
            catalogoGrid.innerHTML = `
                <div class="no-content">
                    <i class="fas fa-${type === 'image' ? 'image' : 'video'}"></i>
                    <h3>Nenhum ${type === 'image' ? 'imagem' : 'vídeo'} encontrado</h3>
                    <p>Os ${type === 'image' ? 'arquivos de imagem' : 'arquivos de vídeo'} serão carregados aqui.</p>
                </div>
            `;
            return;
        }
        
        currentItems.forEach((item, index) => {
            const catalogItem = document.createElement('div');
            catalogItem.className = 'catalogo-item';
            
            let mediaElement = '';
            
            if (type === 'video') {
                mediaElement = `
                    <div class="media-container">
                        <video class="catalogo-video" data-index="${index}" preload="metadata">
                            <source src="${item.src}" type="video/mp4">
                            Seu navegador não suporta o elemento de vídeo.
                        </video>
                        <div class="play-overlay">
                            <i class="fas fa-play"></i>
                        </div>
                        <div class="video-badge">
                            <i class="fas fa-video"></i> Vídeo
                        </div>
                    </div>
                `;
            } else {
                mediaElement = `
                    <img src="${item.src}" alt="${item.alt}" class="catalogo-image" data-index="${index}">
                `;
            }
            
            catalogItem.innerHTML = `
                ${mediaElement}
                <div class="catalogo-info">
                    <div class="modelo">${item.modelo}</div>
                    ${type === 'video' ? '<div class="media-type"><i class="fas fa-video"></i> Vídeo</div>' : '<div class="media-type"><i class="fas fa-image"></i> Imagem</div>'}
                </div>
            `;
            catalogoGrid.appendChild(catalogItem);
        });

        // Adicionar event listeners específicos
        if (type === 'video') {
            addVideoEventListeners();
        } else {
            addImageEventListeners();
        }
    }

    // Adicionar event listeners para imagens
    function addImageEventListeners() {
        const catalogImages = document.querySelectorAll('.catalogo-image');
        
        catalogImages.forEach(img => {
            img.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                openModal(index);
            });

            img.addEventListener('error', function() {
                handleImageError(this);
            });
        });
    }

    // Adicionar event listeners para vídeos
    function addVideoEventListeners() {
        const catalogVideos = document.querySelectorAll('.catalogo-video');
        
        catalogVideos.forEach(video => {
            const container = video.closest('.media-container');
            const playOverlay = container.querySelector('.play-overlay');
            
            // Clicar no overlay para abrir modal
            playOverlay.addEventListener('click', function() {
                const index = parseInt(video.getAttribute('data-index'));
                openModal(index);
            });
            
            // Clicar no vídeo (área não overlay) para preview
            video.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleVideoPlayback(this);
            });
            
            // Atualizar overlay quando vídeo começar a tocar
            video.addEventListener('play', function() {
                container.classList.add('playing');
            });
            
            video.addEventListener('pause', function() {
                container.classList.remove('playing');
            });
            
            // Tratar erro de carregamento de vídeo
            video.addEventListener('error', function() {
                handleVideoError(this, container);
            });
        });
    }

    // Alternar reprodução do vídeo no preview
    function toggleVideoPlayback(video) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    // Abrir modal
    function openModal(index) {
        currentItemIndex = index;
        const item = currentItems[currentItemIndex];
        
        const modalContent = document.querySelector('.modal-content');
        
        if (currentMediaType === 'videos') {
            modalContent.innerHTML = `
                <span class="close-btn" id="closeModal">&times;</span>
                <div class="modal-media-container">
                    <video id="modalVideo" controls autoplay>
                        <source src="${item.src}" type="video/mp4">
                        Seu navegador não suporta o elemento de vídeo.
                    </video>
                </div>
                <div class="modal-nav">
                    <button id="prevBtn" class="nav-btn"><i class="fas fa-chevron-left"></i></button>
                    <span class="modal-counter">${currentItemIndex + 1} / ${currentItems.length}</span>
                    <button id="nextBtn" class="nav-btn"><i class="fas fa-chevron-right"></i></button>
                </div>
            `;
        } else {
            modalContent.innerHTML = `
                <span class="close-btn" id="closeModal">&times;</span>
                <div class="modal-image-container">
                    <img id="modalImage" src="${item.src}" alt="${item.alt}">
                </div>
                <div class="modal-nav">
                    <button id="prevBtn" class="nav-btn"><i class="fas fa-chevron-left"></i></button>
                    <span class="modal-counter">${currentItemIndex + 1} / ${currentItems.length}</span>
                    <button id="nextBtn" class="nav-btn"><i class="fas fa-chevron-right"></i></button>
                </div>
            `;
        }
        
        // Reatachar event listeners
        reattachModalEvents();
        
        imageModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        updateNavButtons();
    }

    // Reanexar event listeners do modal
    function reattachModalEvents() {
        const closeModal = document.getElementById('closeModal');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (closeModal) closeModal.addEventListener('click', closeImageModal);
        if (prevBtn) prevBtn.addEventListener('click', prevItem);
        if (nextBtn) nextBtn.addEventListener('click', nextItem);
        
        // Parar vídeo ao fechar modal
        const modalVideo = document.getElementById('modalVideo');
        if (modalVideo) {
            modalVideo.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }

    // Fechar modal
    function closeImageModal() {
        // Parar vídeo se estiver tocando
        const modalVideo = document.getElementById('modalVideo');
        if (modalVideo) {
            modalVideo.pause();
        }
        
        imageModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Restaurar conteúdo original do modal
        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = `
            <span class="close-btn" id="closeModal">&times;</span>
            <div class="modal-image-container">
                <img id="modalImage" src="" alt="Imagem ampliada">
            </div>
            <div class="modal-nav">
                <button id="prevBtn" class="nav-btn"><i class="fas fa-chevron-left"></i></button>
                <span class="modal-counter">1 / 1</span>
                <button id="nextBtn" class="nav-btn"><i class="fas fa-chevron-right"></i></button>
            </div>
        `;
        
        reattachOriginalModalEvents();
    }

    // Reanexar event listeners originais do modal
    function reattachOriginalModalEvents() {
        const closeModal = document.getElementById('closeModal');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (closeModal) closeModal.addEventListener('click', closeImageModal);
        if (prevBtn) prevBtn.addEventListener('click', prevItem);
        if (nextBtn) nextBtn.addEventListener('click', nextItem);
    }

    // Navegar para item anterior
    function prevItem() {
        if (currentItemIndex > 0) {
            // Parar vídeo atual se estiver tocando
            const currentVideo = document.getElementById('modalVideo');
            if (currentVideo) {
                currentVideo.pause();
            }
            
            currentItemIndex--;
            openModal(currentItemIndex);
        }
    }

    // Navegar para próximo item
    function nextItem() {
        if (currentItemIndex < currentItems.length - 1) {
            // Parar vídeo atual se estiver tocando
            const currentVideo = document.getElementById('modalVideo');
            if (currentVideo) {
                currentVideo.pause();
            }
            
            currentItemIndex++;
            openModal(currentItemIndex);
        }
    }

    // Atualizar estado dos botões de navegação
    function updateNavButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const counter = document.querySelector('.modal-counter');
        
        if (prevBtn) {
            prevBtn.style.opacity = currentItemIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentItemIndex === 0 ? 'not-allowed' : 'pointer';
        }
        
        if (nextBtn) {
            nextBtn.style.opacity = currentItemIndex === currentItems.length - 1 ? '0.5' : '1';
            nextBtn.style.cursor = currentItemIndex === currentItems.length - 1 ? 'not-allowed' : 'pointer';
        }
        
        if (counter) {
            counter.textContent = `${currentItemIndex + 1} / ${currentItems.length}`;
        }
    }

    // Tratar erro de carregamento de imagem
    function handleImageError(imgElement) {
        imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDI4MCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNDAgODBDMTExLjIgODAgODggMTAzLjIgODggMTMyQzg4IDE2MC44IDExMS4yIDE4NCAxNDAgMTg0QzE2OC44IDE4NCAxOTIgMTYwLjggMTkyIDEzMkMxOTIgMTAzLjIgMTY4LjggODAgMTQwIDgwWiIgc3Ryb2tlPSIjQzRDMEMwIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTE0MCAxMjBMMTYwIDE0MEwxMjAgMTQwTDE0MCAxMjBaIiBmaWxsPSIjQzRDMEMwIi8+CjxwYXRoIGQ9Ik0xMDAgMjA4TDE4MCAyMDgiIHN0cm9rZT0iI0M0QzBDMCIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjE0MCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjQzRDMEMwIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0iQXJpYWwiPkltYWdlbSBuw6NvIGVuY29udHJhZGE8L3RleHQ+Cjwvc3ZnPgo=';
        imgElement.alt = 'Imagem não encontrada';
    }

    // Tratar erro de carregamento de vídeo
    function handleVideoError(videoElement, container) {
        console.log('Vídeo não encontrado');
        container.innerHTML = `
            <div class="video-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Vídeo não disponível</p>
            </div>
        `;
    }

    // Menu mobile toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
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

    // Inicializar filtros
    function initFilters() {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                if (filter === 'images') {
                    showImages();
                } else if (filter === 'videos') {
                    showVideos();
                }
            });
        });
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
            
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = window.scrollY;
        });
    }

    // Inicializar todas as funcionalidades
    function init() {
        loadCatalogItems();
        initFilters();
        initSmoothScroll();
        initHeaderScroll();

        // Event Listeners
        hamburger.addEventListener('click', toggleMobileMenu);

        // Fechar modal ao clicar fora do conteúdo
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
                if (e.key === 'ArrowLeft') prevItem();
                if (e.key === 'ArrowRight') nextItem();
                
                // Espaço para play/pause do vídeo
                if (e.key === ' ' && currentMediaType === 'videos') {
                    e.preventDefault();
                    const modalVideo = document.getElementById('modalVideo');
                    if (modalVideo) {
                        toggleVideoPlayback(modalVideo);
                    }
                }
            }
        });

        // Swipe para mobile no modal
        let touchStartX = 0;
        let touchEndX = 0;

        imageModal.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        imageModal.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextItem();
                } else {
                    prevItem();
                }
            }
        }
    }

    // Inicializar quando o DOM estiver pronto
    init();
});

// Adicionar CSS adicional
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .filters {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }
    
    .filter-btn {
        background: var(--primary-white);
        color: var(--primary-black);
        border: 2px solid var(--primary-gold);
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .filter-btn:hover {
        background: var(--primary-gold);
        color: var(--primary-black);
        transform: translateY(-2px);
    }
    
    .filter-btn.active {
        background: var(--primary-gold);
        color: var(--primary-black);
    }
    
    .media-container {
        position: relative;
        width: 100%;
        height: 250px;
        overflow: hidden;
        cursor: pointer;
    }
    
    .catalogo-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background: #000;
    }
    
    .play-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .play-overlay:hover {
        background: rgba(0, 0, 0, 0.5);
    }
    
    .play-overlay i {
        color: var(--primary-gold);
        font-size: 3rem;
        opacity: 0.8;
        transition: all 0.3s ease;
    }
    
    .play-overlay:hover i {
        opacity: 1;
        transform: scale(1.1);
    }
    
    .media-container.playing .play-overlay {
        opacity: 0;
        pointer-events: none;
    }
    
    .video-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background: var(--primary-gold);
        color: var(--primary-black);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.7rem;
        font-weight: 600;
    }
    
    .media-type {
        display: inline-block;
        background: var(--primary-gold);
        color: var(--primary-black);
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.7rem;
        margin-top: 5px;
    }
    
    .modal-media-container {
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 70vh;
    }
    
    #modalVideo {
        max-width: 100%;
        max-height: 70vh;
        background: #000;
        border-radius: 5px;
    }
    
    .modal-counter {
        color: var(--primary-white);
        font-weight: 600;
        margin: 0 1rem;
    }
    
    .no-content {
        text-align: center;
        padding: 3rem;
        color: var(--gray-dark);
        grid-column: 1 / -1;
    }
    
    .no-content i {
        font-size: 4rem;
        color: var(--primary-gold);
        margin-bottom: 1rem;
    }
    
    .video-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        background: var(--gray-light);
        color: var(--gray-dark);
    }
    
    .video-error i {
        font-size: 2rem;
        color: var(--primary-gold);
        margin-bottom: 1rem;
    }
    
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
        
        .filters {
            gap: 0.5rem;
        }
        
        .filter-btn {
            padding: 8px 16px;
            font-size: 0.9rem;
        }
        
        .modal-media-container {
            padding: 1rem;
            max-height: 60vh;
        }
        
        #modalVideo {
            max-height: 60vh;
        }
    }
`;
document.head.appendChild(additionalStyles);