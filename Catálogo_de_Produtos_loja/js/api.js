// API para manipulação de dados JSON
class ProductsAPI {
    constructor() {
        this.productsData = {
            "jogos-americanos": [],
            "toalhas-mesa": [],
            "loucas": []
        };
        this.loadFromLocalStorage();
    }

    // Carregar dados do localStorage
    loadFromLocalStorage() {
        const savedData = localStorage.getItem('yahwehProductsData');
        if (savedData) {
            try {
                this.productsData = JSON.parse(savedData);
            } catch (e) {
                console.error('Erro ao carregar dados do localStorage:', e);
                this.loadDefaultData();
            }
        } else {
            this.loadDefaultData();
        }
    }

    // Carregar dados padrão
    loadDefaultData() {
        // Dados iniciais para jogos americanos
        for (let i = 1; i <= 5; i++) {
            this.productsData["jogos-americanos"].push({
                id: i,
                title: `Jogo Americano Elegante ${i}`,
                description: `Jogo americano em linho de alta qualidade com design exclusivo. Perfeito para refeições elegantes.`,
                price: `${(17000 + Math.floor(Math.random() * 19000)).toLocaleString('pt-PT')} Kz`,
                image: `jogos-americanos/${i}.jpg`,
                ref: `JA${i.toString().padStart(3, '0')}`
            });
        }
        
        // Dados iniciais para toalhas de mesa
        for (let i = 1; i <= 5; i++) {
            const sizes = ["para 4 lugares", "para 6 lugares", "para 8 lugares", "para 12 lugares"];
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            
            let price;
            if (size.includes("4")) price = (187000 + Math.floor(Math.random() * 20000)).toLocaleString('pt-PT');
            else if (size.includes("6")) price = (220000 + Math.floor(Math.random() * 30000)).toLocaleString('pt-PT');
            else if (size.includes("8")) price = (260000 + Math.floor(Math.random() * 40000)).toLocaleString('pt-PT');
            else price = (370000 + Math.floor(Math.random() * 60000)).toLocaleString('pt-PT');
            
            this.productsData["toalhas-mesa"].push({
                id: i,
                title: `Toalha de Mesa ${size.charAt(0).toUpperCase() + size.slice(1)}`,
                description: `Toalha de mesa ${size} em algodão egípcio de alta qualidade. Ideal para ocasiões especiais.`,
                price: `${price} Kz`,
                image: `toalhas-mesa/${i}.jpg`,
                ref: `TM${i.toString().padStart(3, '0')}`
            });
        }
        
        // Dados iniciais para louças
        for (let i = 1; i <= 5; i++) {
            const brands = ["Wolf", "Boehemia", "Vista Alegre"];
            const brand = brands[Math.floor(Math.random() * brands.length)];
            
            this.productsData["loucas"].push({
                id: i,
                title: `Conjunto de Louças ${brand} ${i}`,
                description: `Conjunto de louças ${brand} em porcelana fina. Inclui pratos, travessas e taças.`,
                price: `${(150000 + Math.floor(Math.random() * 350000)).toLocaleString('pt-PT')} Kz`,
                image: `loucas/${i}.jpg`,
                ref: `LC${i.toString().padStart(3, '0')}`
            });
        }
        
        this.saveToLocalStorage();
    }

    // Salvar dados no localStorage
    saveToLocalStorage() {
        try {
            localStorage.setItem('yahwehProductsData', JSON.stringify(this.productsData));
            return true;
        } catch (e) {
            console.error('Erro ao salvar dados no localStorage:', e);
            return false;
        }
    }

    // Exportar para JSON
    exportToJSON() {
        try {
            const dataStr = JSON.stringify(this.productsData, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            
            const exportFileDefaultName = 'produtos.json';
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            
            return true;
        } catch (e) {
            console.error('Erro ao exportar JSON:', e);
            return false;
        }
    }

    // Importar de JSON
    importFromJSON(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    
                    // Validar a estrutura dos dados
                    if (jsonData && jsonData["jogos-americanos"] && jsonData["toalhas-mesa"] && jsonData["loucas"]) {
                        this.productsData = jsonData;
                        if (this.saveToLocalStorage()) {
                            resolve(true);
                        } else {
                            reject(new Error('Erro ao salvar dados importados.'));
                        }
                    } else {
                        reject(new Error('Formato de ficheiro JSON inválido.'));
                    }
                } catch (e) {
                    reject(new Error('Erro ao analisar JSON: ' + e.message));
                }
            };
            reader.onerror = () => reject(new Error('Erro ao ler o ficheiro.'));
            reader.readAsText(file);
        });
    }

    // Obter produtos por categoria
    getProductsByCategory(category) {
        return this.productsData[category] || [];
    }

    // Adicionar produto
    addProduct(category, product) {
        if (!this.productsData[category]) {
            this.productsData[category] = [];
        }
        
        product.id = this.productsData[category].length > 0 
            ? Math.max(...this.productsData[category].map(p => p.id)) + 1 
            : 1;
            
        this.productsData[category].push(product);
        return this.saveToLocalStorage();
    }

    // Atualizar produto
    updateProduct(category, productId, productData) {
        const index = this.productsData[category].findIndex(p => p.id === productId);
        if (index !== -1) {
            this.productsData[category][index] = {...productData, id: productId};
            return this.saveToLocalStorage();
        }
        return false;
    }

    // Eliminar produto
    deleteProduct(category, productId) {
        this.productsData[category] = this.productsData[category].filter(p => p.id !== productId);
        return this.saveToLocalStorage();
    }

    // Obter contagem de produtos por categoria
    getProductsCount() {
        return {
            "jogos-americanos": this.productsData["jogos-americanos"].length,
            "toalhas-mesa": this.productsData["toalhas-mesa"].length,
            "loucas": this.productsData["loucas"].length
        };
    }
}

// Instância global da API
window.productsAPI = new ProductsAPI();