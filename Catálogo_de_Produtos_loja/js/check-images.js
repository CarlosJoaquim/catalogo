// Verificador de imagens
class ImageChecker {
    constructor() {
        this.brokenImages = [];
    }

    async checkAllImages() {
        const products = window.productsAPI.getAllData();
        this.brokenImages = [];
        
        for (const category in products) {
            for (const product of products[category]) {
                const exists = await this.checkImageExists(product.image);
                if (!exists) {
                    this.brokenImages.push({
                        category,
                        product: product.title,
                        image: product.image
                    });
                }
            }
        }
        
        this.reportBrokenImages();
    }

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

    reportBrokenImages() {
        if (this.brokenImages.length === 0) {
            console.log('✅ Todas as imagens carregaram corretamente!');
            return;
        }
        
        console.warn('❌ Imagens não encontradas:');
        this.brokenImages.forEach(item => {
            console.warn(`- Categoria: ${item.category}`);
            console.warn(`- Produto: ${item.product}`);
            console.warn(`- Imagem: ${item.image}`);
            console.warn('---');
        });
        
        // Mostrar alerta visual
        this.showBrokenImagesAlert();
    }

    showBrokenImagesAlert() {
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
            <strong>⚠️ ${this.brokenImages.length} imagens não encontradas</strong>
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
    }
}

// Adicione ao final do main.js, depois que os dados carregarem:
setTimeout(() => {
    if (window.productsAPI.isReady()) {
        window.imageChecker = new ImageChecker();
        window.imageChecker.checkAllImages();
    }
}, 2000);