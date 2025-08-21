// API para manipulação de dados JSON
class ProductsAPI {
    constructor() {
        this.productsData = null;
        this.ready = false;
    }

    // Inicializar carregando dados
    async init() {
        if (this.ready) return;
        
        await window.dataLoader.init();
        this.productsData = window.dataLoader.productsData;
        this.ready = true;
        console.log('ProductsAPI inicializada');
    }

    // Obter produtos por categoria
    getProductsByCategory(category) {
        if (!this.ready || !this.productsData) {
            console.warn('ProductsAPI não está pronta ou dados não carregados');
            return [];
        }
        return this.productsData[category] || [];
    }

    // Obter contagem de produtos por categoria
    getProductsCount() {
        if (!this.ready) {
            return {
                "jogos-americanos": 0,
                "toalhas-mesa": 0,
                "loucas": 0
            };
        }
        return window.dataLoader.getProductsCount();
    }

    // Obter todos os dados
    getAllData() {
        if (!this.ready) return {};
        return this.productsData;
    }

    // Verificar se a API está pronta
    isReady() {
        return this.ready;
    }
}

// Instância global da API
window.productsAPI = new ProductsAPI();