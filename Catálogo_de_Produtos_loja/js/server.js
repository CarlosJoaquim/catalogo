// Simulador de servidor para persistência em arquivos JSON
class JSONServer {
    constructor() {
        this.endpoint = '/api';
        this.isLocal = window.location.protocol === 'file:';
    }

    // Simular uma requisição ao servidor
    async request(endpoint, data = null, method = 'GET') {
        // Se estiver abrindo via file:// (local), usar localStorage
        if (this.isLocal) {
            return this.handleLocalRequest(endpoint, data, method);
        }
        
        // Se estiver em servidor real, fazer fetch
        try {
            const response = await fetch(`${this.endpoint}${endpoint}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data ? JSON.stringify(data) : null
            });
            return await response.json();
        } catch (error) {
            console.error('Erro no servidor:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    }

    // Manipular requisições localmente
    handleLocalRequest(endpoint, data, method) {
        switch (endpoint) {
            case '/save-products':
                if (method === 'POST' && data) {
                    localStorage.setItem('yahwehProductsData', JSON.stringify(data));
                    return { success: true, message: 'Dados salvos com sucesso!' };
                }
                break;
                
            case '/load-products':
                const savedData = localStorage.getItem('yahwehProductsData');
                if (savedData) {
                    return { success: true, data: JSON.parse(savedData) };
                }
                return { success: false, error: 'Nenhum dado encontrado' };
                
            default:
                return { success: false, error: 'Endpoint não encontrado' };
        }
    }

    // Salvar produtos
    async saveProducts(productsData) {
        return await this.request('/save-products', productsData, 'POST');
    }

    // Carregar produtos
    async loadProducts() {
        return await this.request('/load-products');
    }
}

// Instância global do servidor
window.jsonServer = new JSONServer();