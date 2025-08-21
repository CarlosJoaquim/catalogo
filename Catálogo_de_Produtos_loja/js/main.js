// Lógica principal do catálogo
document.addEventListener('DOMContentLoaded', function() {
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

    // Event Listeners
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            openProductsModal(category);
        });
    });

    closeModalBtn.addEventListener('click', closeProductsModal);

    closeImageModalBtn.addEventListener('click', () => {
        imageModal.classList.remove('active');
        setTimeout(() => {
            imageModal.style.display = 'none';
        }, 400);
    });

    // Fechar modais ao clicar fora do conteúdo
    window.addEventListener('click', (e) => {
        if (e.target === productsModal) {
            closeProductsModal();
        }
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
            setTimeout(() => {
                imageModal.style.display = 'none';
            }, 400);
        }
    });

    // Funções
    function openProductsModal(category) {
        currentCategory = category;
        currentPage = 1;
        
        // Definir título da modal conforme a categoria
        const categoryTitles = {
            'jogos-americanos': 'Jogos Americanos',
            'toalhas-mesa': 'Toalhas de Mesa',
            'loucas': 'Louças'
        };
        
        modalCategoryTitle.textContent = categoryTitles[category];
        
        // Renderizar produtos
        renderProducts();
        
        // Mostrar a modal com animação
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

    function renderProducts() {
        // Limpar grid de produtos
        productsGrid.innerHTML = '';
        
        // Obter produtos da categoria atual
        const products = window.productsAPI.getProductsByCategory(currentCategory);
        
        // Calcular índices dos produtos a mostrar
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, products.length);
        const productsToShow = products.slice(startIndex, endIndex);
        
        // Renderizar cada produto
        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" 
                         alt="${product.title}" 
                         data-src="${product.image}">
                </div>
                <div class="product-info">
                    <div class="product-title">${product.title}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-price">${product.price}</div>
                    <div class="product-ref">Ref: ${product.ref}</div>
                </div>
            `;
            
            // Adicionar evento de clique para ampliar imagem
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
        
        // Renderizar paginação
        renderPagination(products.length);
    }

    function renderPagination(totalProducts) {
        // Limpar paginação existente
        pagination.innerHTML = '';
        
        // Calcular número total de páginas
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        
        // Botão Anterior
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
        
        // Números de página
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
        
        // Botão Próximo
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