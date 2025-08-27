// Carregador de dados dos arquivos JSON
class DataLoader {
    constructor() {
        this.productsData = null;
        this.categoriesData = null;
        this.initialized = false;
    }

    // Inicializar carregando todos os dados
    async init() {
        if (this.initialized) return;
        
        try {
            await Promise.all([
                this.loadProducts(),
                this.loadCategories()
            ]);
            this.initialized = true;
            console.log('Dados carregados com sucesso');
        } catch (error) {
            console.error('Erro ao inicializar dados:', error);
        }
    }

    // Carregar produtos do arquivo JSON
    async loadProducts() {
        try {
            const response = await fetch('data/produtos.json');
            if (!response.ok) {
                throw new Error('Erro ao carregar produtos.json');
            }
            let productsData = await response.json();
            
            // Corrigir extensões das imagens
            productsData = this.fixImageExtensions(productsData);
            
            this.productsData = productsData;
            return this.productsData;
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
            this.productsData = this.getDefaultProducts();
            return this.productsData;
        }
    }

    // Carregar categorias do arquivo JSON
    async loadCategories() {
        try {
            const response = await fetch('data/categorias.json');
            if (!response.ok) {
                throw new Error('Erro ao carregar categorias.json');
            }
            this.categoriesData = await response.json();
            return this.categoriesData;
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
            this.categoriesData = this.getDefaultCategories();
            return this.categoriesData;
        }
    }

    // Função para corrigir extensões de imagens
    fixImageExtensions(data) {
        const categories = ['jogos-americanos', 'toalhas-mesa', 'loucas'];
        
        categories.forEach(category => {
            if (data[category]) {
                data[category].forEach(product => {
                    if (product.image) {
                        // Corrigir caminho da imagem
                        product.image = this.fixImagePath(product.image);
                    }
                });
            }
        });
        
        return data;
    }

    // Função para corrigir caminho de imagem
    fixImagePath(imagePath) {
        if (!imagePath) return 'https://placehold.co/300x200/FFFFFF/D4AF37?text=Imagem+Não+Disponível';
        
        // Se já é uma URL completa, não modificar
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        
        // Converter .jpg para .jpeg se necessário
        if (imagePath.endsWith('.jpg')) {
            imagePath = imagePath.replace('.jpg', '.jpeg');
        }
        
        // Adicionar pasta imagens/ se não estiver presente
        if (!imagePath.startsWith('imagens/')) {
            imagePath = 'imagens/' + imagePath;
        }
        
        return imagePath;
    }

    // Dados padrão de produtos (fallback)
    getDefaultProducts() {
        const defaultProducts = {
            "jogos-americanos": [
                {
                    "id": 1,
                    "title": "Jogo Americano Elegante",
                    "description": "Jogo americano em linho de alta qualidade.",
                    "price": "25.000 Kz",
                    "image": "../imagens/jogos-americanos/1.jpeg",
                    "ref": "JA001"
                }
            ],
            "toalhas-mesa": [
                {
                    "id": 1,
                    "title": "Toalha de Mesa para 4 lugares",
                    "description": "Toalha de mesa em algodão egípcio.",
                    "price": "187.000 Kz",
                    "image": "imagens/toalhas-mesa/1.jpeg",
                    "ref": "TM001"
                }
            ],
            "loucas": [
                {
                    "id": 1,
                    "title": "Conjunto de Louças Wolf",
                    "description": "Conjunto de louças em porcelana fina.",
                    "price": "850.000 Kz",
                    "image": "imagens/loucas/1.jpeg",
                    "ref": "LC001"
                }
            ]
        };
        
        // Aplicar correção de caminhos nas imagens padrão também
        return this.fixImageExtensions(defaultProducts);
    }

    // Dados padrão de categorias (fallback)
    getDefaultCategories() {
        return {
            "categorias": [
                {
                    "id": "jogos-americanos",
                    "nome": "Jogos Americanos",
                    "descricao": "Jogos americanos de alta qualidade",
                    "imagem": "https://placehold.co/400x300/FFFFFF/D4AF37?text=Jogos+Americanos"
                },
                {
                    "id": "toalhas-mesa",
                    "nome": "Toalhas de Mesa",
                    "descricao": "Toalhas de mesa para diversos tamanhos",
                    "imagem": "https://placehold.co/400x300/FFFFFF/D4AF37?text=Toalhas+de+Mesa"
                },
                {
                    "id": "loucas",
                    "nome": "Louças",
                    "descricao": "Conjuntos de louças de marcas premium",
                    "imagem": "https://placehold.co/400x300/FFFFFF/D4AF37?text=Louças"
                }
            ]
        };
    }

    // Obter produtos por categoria (com correção de imagens)
    getProductsByCategory(category) {
        if (!this.productsData || !this.productsData[category]) {
            return [];
        }
        
        // Garantir que todas as imagens têm o caminho correto
        return this.productsData[category].map(product => ({
            ...product,
            image: this.fixImagePath(product.image)
        }));
    }

    // Obter todas as categorias
    getCategories() {
        if (!this.categoriesData || !this.categoriesData.categorias) {
            return [];
        }
        return this.categoriesData.categorias;
    }

    // Obter informação específica de uma categoria
    getCategoryInfo(categoryId) {
        if (!this.categoriesData || !this.categoriesData.categorias) {
            return null;
        }
        return this.categoriesData.categorias.find(cat => cat.id === categoryId);
    }

    // Obter contagem de produtos
    getProductsCount() {
        if (!this.productsData) {
            return {
                "jogos-americanos": 0,
                "toalhas-mesa": 0,
                "loucas": 0
            };
        }

        return {
            "jogos-americanos": this.productsData["jogos-americanos"] ? this.productsData["jogos-americanos"].length : 0,
            "toalhas-mesa": this.productsData["toalhas-mesa"] ? this.productsData["toalhas-mesa"].length : 0,
            "loucas": this.productsData["loucas"] ? this.productsData["loucas"].length : 0
        };
    }

    // Verificar se os dados estão carregados
    isLoaded() {
        return this.initialized;
    }

    // Verificar se uma imagem existe (para debug)
    async checkImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
            
            // Timeout para evitar espera infinita
            setTimeout(() => resolve(false), 2000);
        });
    }

    // Verificar todas as imagens (para debug)
    async checkAllImages() {
        if (!this.productsData) return [];
        
        const brokenImages = [];
        const categories = ['jogos-americanos', 'toalhas-mesa', 'loucas'];
        
        for (const category of categories) {
            if (this.productsData[category]) {
                for (const product of this.productsData[category]) {
                    const exists = await this.checkImageExists(product.image);
                    if (!exists) {
                        brokenImages.push({
                            category,
                            product: product.title,
                            image: product.image
                        });
                    }
                }
            }
        }
        
        return brokenImages;
    }
}

// Instância global do carregador de dados
window.dataLoader = new DataLoader();

// Função global para debug de imagens
window.checkImages = async function() {
    const brokenImages = await window.dataLoader.checkAllImages();
    
    if (brokenImages.length === 0) {
        console.log('✅ Todas as imagens carregaram corretamente!');
        return;
    }
    
    console.warn('❌ Imagens não encontradas:');
    brokenImages.forEach(item => {
        console.warn(`- Categoria: ${item.category}`);
        console.warn(`- Produto: ${item.product}`);
        console.warn(`- Imagem: ${item.image}`);
        console.warn('---');
    });
    
    // Mostrar alerta visual
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 15px;
        border-radius: 5px;
        z-index: 10000;
        max-width: 300px;
        cursor: pointer;
    `;
    alertDiv.innerHTML = `
        <strong>⚠️ ${brokenImages.length} imagens não encontradas</strong>
        <p>Verifique o console para detalhes</p>
    `;
    
    alertDiv.addEventListener('click', () => {
        alertDiv.remove();
    });
    
    document.body.appendChild(alertDiv);
    
    // Remover automaticamente após 10 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 10000);
    
    return brokenImages;
};