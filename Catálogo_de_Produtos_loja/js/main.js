// Lógica principal do catálogo
document.addEventListener('DOMContentLoaded', async function() {
    // Elementos DOM
    const categoryCards = document.querySelectorAll('.category-card');
    const productsModal = document.getElementById('productsModal');
    const modalCategoryTitle = document.getElementById('modalCategoryTitle');
    const productsGrid = document.getElementById('productsGrid');
    const pagination = document.getElementById('pagination');
    const closeModalBtn = document.querySelector('.close-modal');
    const imageModal = document.getElementById('imageModal');
    const expandedImage = document.getElementById('expandedImage');
    const closeImageModalBtn = document.querySelector('.close-image-modal');

    // Variáveis de estado
    let currentCategory = '';
    let currentPage = 1;
    const productsPerPage = 9;
    let dataLoaded = false;

    // Inicializar a API e carregar dados
    await initializeData();

    // Configurar event listeners
    setupEventListeners();

    // Função para inicializar dados
    async function initializeData() {
        try {
            // Mostrar loading
            document.body.classList.add('loading');
            
            // Inicializar a API de produtos
            await window.productsAPI.init();
            
            // Carregar e exibir categorias
            await loadCategories();
            
            dataLoaded = true;
            console.log('Dados inicializados com sucesso');
            
        } catch (error) {
            console.error('Erro ao inicializar dados:', error);
            showError('Erro ao carregar dados. Recarregue a página.');
        } finally {
            document.body.classList.remove('loading');
        }
    }

    // Configurar event listeners
    function setupEventListeners() {
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                if (!dataLoaded) {
                    showError('Dados ainda não carregados. Aguarde.');
                    return;
                }
                const category = card.getAttribute('data-category');
                openProductsModal(category);
            });
        });

        closeModalBtn.addEventListener('click', closeProductsModal);
        closeImageModalBtn.addEventListener('click', closeImageModal);

        // Fechar modais ao clicar fora do conteúdo
        window.addEventListener('click', (e) => {
            if (e.target === productsModal) closeProductsModal();
            if (e.target === imageModal) closeImageModal();
        });
    }

    // Função para carregar categorias
    async function loadCategories() {
        try {
            const categoriesData = await window.dataLoader.loadCategories();
            const categories = categoriesData.categorias;
            
            // Atualizar contadores
            const counts = window.productsAPI.getProductsCount();
            document.getElementById('jogosCount').textContent = `${counts["jogos-americanos"]} produtos`;
            document.getElementById('toalhasCount').textContent = `${counts["toalhas-mesa"]} produtos`;
            document.getElementById('loucasCount').textContent = `${counts["loucas"]} produtos`;

            // Atualizar imagens das categorias se existirem no JSON
            categories.forEach(category => {
                const card = document.querySelector(`[data-category="${category.id}"]`);
                if (card && category.imagem) {
                    const img = card.querySelector('.category-image img');
                    if (img) img.src = category.imagem;
                }
            });
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    }

    // Função para mostrar erro
    function showError(message) {
        // Criar ou atualizar elemento de erro
        let errorDiv = document.getElementById('loadError');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'loadError';
            errorDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ff4444;
                color: white;
                padding: 15px;
                border-radius: 5px;
                z-index: 10000;
                max-width: 300px;
            `;
            document.body.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (errorDiv) errorDiv.remove();
        }, 5000);
    }

    // Funções de modal
    function openProductsModal(category) {
        currentCategory = category;
        currentPage = 1;
        
        // Definir título da modal conforme a categoria
        const categoryInfo = window.dataLoader.getCategoryInfo(category);
        modalCategoryTitle.textContent = categoryInfo ? categoryInfo.nome : category;
        
        renderProducts();
        
        productsModal.style.display = 'block';
        setTimeout(() => {
            productsModal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    function closeProductsModal() {
        productsModal.classList.remove('active');
        setTimeout(() => {
            productsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 400);
    }

    function closeImageModal() {
        imageModal.classList.remove('active');
        setTimeout(() => {
            imageModal.style.display = 'none';
        }, 400);
    }

    function renderProducts() {
        productsGrid.innerHTML = '';
        
        const products = window.productsAPI.getProductsByCategory(currentCategory);
        
        if (products.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <h3>Nenhum produto encontrado</h3>
                    <p>Não há produtos disponíveis nesta categoria.</p>
                </div>
            `;
            pagination.innerHTML = '';
            return;
        }
        
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, products.length);
        const productsToShow = products.slice(startIndex, endIndex);
        
        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" 
                         alt="${product.title}" 
                         data-src="${product.image}"
                         onerror="this.src='https://placehold.co/300x200/FFFFFF/D4AF37?text=Imagem+Não+Disponível'">
                </div>
                <div class="product-info">
                    <div class="product-title">${product.title}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-price">${product.price}</div>
                    <div class="product-ref">Ref: ${product.ref}</div>
                </div>
            `;
            
            const productImage = productCard.querySelector('.product-image');
            productImage.addEventListener('click', () => {
                expandedImage.src = productImage.querySelector('img').getAttribute('data-src');
                expandedImage.alt = product.title;
                imageModal.style.display = 'flex';
                setTimeout(() => {
                    imageModal.classList.add('active');
                }, 10);
            });
            
            productsGrid.appendChild(productCard);
        });
        
        renderPagination(products.length);
    }

    function renderPagination(totalProducts) {
        pagination.innerHTML = '';
        
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        
        if (totalPages <= 1) return;
        
        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.innerHTML = '&laquo; Anterior';
            prevButton.addEventListener('click', () => {
                currentPage--;
                renderProducts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            pagination.appendChild(prevButton);
        }
        
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.toggle('active', i === currentPage);
            
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderProducts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            pagination.appendChild(pageButton);
        }
        
        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.innerHTML = 'Próximo &raquo;';
            nextButton.addEventListener('click', () => {
                currentPage++;
                renderProducts();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            pagination.appendChild(nextButton);
        }
    }
});