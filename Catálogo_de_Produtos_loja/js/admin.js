// Painel Administrativo
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const adminToggle = document.getElementById('adminToggle');
    const adminPanel = document.getElementById('adminPanel');
    const adminCategorySelect = document.getElementById('adminCategorySelect');
    const addProductBtn = document.getElementById('addProductBtn');
    const adminForm = document.getElementById('adminForm');
    const formTitle = document.getElementById('formTitle');
    const submitProductBtn = document.getElementById('submitProductBtn');
    const cancelProductBtn = document.getElementById('cancelProductBtn');
    const adminProductsList = document.getElementById('adminProductsList');
    const saveJsonBtn = document.getElementById('saveJsonBtn');
    const loadJsonBtn = document.getElementById('loadJsonBtn');
    const resetDataBtn = document.getElementById('resetDataBtn');
    const statusMessage = document.getElementById('statusMessage');
    const jogosCount = document.getElementById('jogosCount');
    const toalhasCount = document.getElementById('toalhasCount');
    const loucasCount = document.getElementById('loucasCount');

    // Variáveis de estado
    let editingProductId = null;

    // Inicializar
    updateCategoryCounts();

    // Event Listeners
    adminToggle.addEventListener('click', toggleAdminPanel);
    adminCategorySelect.addEventListener('change', renderAdminProducts);
    addProductBtn.addEventListener('click', showProductForm);
    cancelProductBtn.addEventListener('click', hideProductForm);
    submitProductBtn.addEventListener('click', submitProduct);
    saveJsonBtn.addEventListener('click', saveToServer);
    loadJsonBtn.addEventListener('click', loadFromServer);
    resetDataBtn.addEventListener('click', resetData);

    // Funções
    function toggleAdminPanel() {
        adminPanel.classList.toggle('active');
        if (adminPanel.classList.contains('active')) {
            adminToggle.textContent = 'Fechar Admin';
            renderAdminProducts();
        } else {
            adminToggle.textContent = 'Modo Admin';
            hideProductForm();
        }
    }

    function showStatus(message, type = 'success') {
        statusMessage.textContent = message;
        statusMessage.className = `status-message status-${type}`;
        statusMessage.style.display = 'block';
        
        setTimeout(() => {
            statusMessage.style.display = 'none';
        }, 5000);
    }

    function updateCategoryCounts() {
        const counts = window.productsAPI.getProductsCount();
        jogosCount.textContent = `${counts["jogos-americanos"]} produtos`;
        toalhasCount.textContent = `${counts["toalhas-mesa"]} produtos`;
        loucasCount.textContent = `${counts["loucas"]} produtos`;
    }

    function showProductForm() {
        adminForm.classList.add('active');
        formTitle.textContent = 'Adicionar Novo Produto';
        document.getElementById('productTitle').value = '';
        document.getElementById('productDescription').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productImage').value = '';
        document.getElementById('productRef').value = '';
        editingProductId = null;
    }

    function hideProductForm() {
        adminForm.classList.remove('active');
    }

    function submitProduct() {
        const title = document.getElementById('productTitle').value;
        const description = document.getElementById('productDescription').value;
        const price = document.getElementById('productPrice').value;
        const image = document.getElementById('productImage').value;
        const ref = document.getElementById('productRef').value;
        const category = adminCategorySelect.value;
        
        if (!title || !description || !price || !image || !ref) {
            showStatus('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        const productData = {
            title,
            description,
            price: `${parseInt(price).toLocaleString('pt-PT')} Kz`,
            image,
            ref
        };
        
        let success = false;
        
        if (editingProductId !== null) {
            // Editar produto existente
            success = window.productsAPI.updateProduct(category, editingProductId, productData);
            if (success) {
                showStatus('Produto atualizado com sucesso!', 'success');
            }
        } else {
            // Adicionar novo produto
            success = window.productsAPI.addProduct(category, productData);
            if (success) {
                showStatus('Produto adicionado com sucesso!', 'success');
            }
        }
        
        if (success) {
            renderAdminProducts();
            hideProductForm();
            updateCategoryCounts();
        } else {
            showStatus('Erro ao guardar dados.', 'error');
        }
    }

    function renderAdminProducts() {
        const category = adminCategorySelect.value;
        const products = window.productsAPI.getProductsByCategory(category);
        
        adminProductsList.innerHTML = '';
        
        if (products.length === 0) {
            adminProductsList.innerHTML = '<p>Nenhum produto nesta categoria.</p>';
            return;
        }
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'admin-product-card';
            
            productCard.innerHTML = `
                <div class="admin-product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="admin-product-title">${product.title}</div>
                <div class="admin-product-description">${product.description}</div>
                <div class="admin-product-price">${product.price}</div>
                <div class="admin-product-ref">Ref: ${product.ref}</div>
                <div class="admin-product-actions">
                    <button class="admin-btn btn-primary" onclick="window.editProduct(${product.id}, '${category}')">Editar</button>
                    <button class="admin-btn btn-danger" onclick="window.deleteProduct(${product.id}, '${category}')">Eliminar</button>
                </div>
            `;
            
            adminProductsList.appendChild(productCard);
        });
    }

    function saveToServer() {
        // Simular salvamento no servidor
        // Em um ambiente real, isso seria uma requisição AJAX para o servidor
        const data = window.productsAPI.getAllData();
        const dataStr = JSON.stringify(data, null, 2);
        
        // Simular o salvamento no servidor
        showStatus('Dados guardados com sucesso no servidor!', 'success');
        console.log('Dados para guardar no servidor:', dataStr);
        
        // Em um ambiente real, você faria:
        // fetch('/api/save-products', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: dataStr
        // })
        // .then(response => response.json())
        // .then(data => showStatus('Dados guardados com sucesso!', 'success'))
        // .catch(error => showStatus('Erro ao guardar dados.', 'error'));
    }

    function loadFromServer() {
        // Simular carregamento do servidor
        // Em um ambiente real, isso seria uma requisição AJAX para o servidor
        
        // Primeiro, tenta carregar do localStorage como fallback
        if (localStorage.getItem('yahwehProductsData')) {
            window.productsAPI.loadFromLocalStorage();
            renderAdminProducts();
            updateCategoryCounts();
            showStatus('Dados carregados do armazenamento local!', 'success');
        } else {
            showStatus('Nenhum dado encontrado para carregar.', 'warning');
        }
        
        // Em um ambiente real, você faria:
        // fetch('/api/load-products')
        // .then(response => response.json())
        // .then(data => {
        //     window.productsAPI.loadFromDataObject(data);
        //     renderAdminProducts();
        //     updateCategoryCounts();
        //     showStatus('Dados carregados com sucesso!', 'success');
        // })
        // .catch(error => showStatus('Erro ao carregar dados.', 'error'));
    }

    function resetData() {
        if (confirm('Tem a certeza que deseja repor os dados padrão? Esta ação não pode ser desfeita.')) {
            window.productsAPI.loadDefaultData();
            renderAdminProducts();
            updateCategoryCounts();
            showStatus('Dados repostos com sucesso!', 'success');
        }
    }

    // Funções globais para os botões de editar/eliminar
    window.editProduct = function(productId, category) {
        const products = window.productsAPI.getProductsByCategory(category);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            editingProductId = productId;
            adminForm.classList.add('active');
            formTitle.textContent = 'Editar Produto';
            
            document.getElementById('productTitle').value = product.title;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productPrice').value = parseInt(product.price.replace(/\D/g, ''));
            document.getElementById('productImage').value = product.image;
            document.getElementById('productRef').value = product.ref;
        }
    };

    window.deleteProduct = function(productId, category) {
        if (confirm('Tem a certeza que deseja eliminar este produto?')) {
            if (window.productsAPI.deleteProduct(category, productId)) {
                renderAdminProducts();
                updateCategoryCounts();
                showStatus('Produto eliminado com sucesso!', 'success');
            } else {
                showStatus('Erro ao eliminar produto.', 'error');
            }
        }
    };
});