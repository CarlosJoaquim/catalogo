// Dados das louças
document.addEventListener('DOMContentLoaded', function() {
    const brands = ["Wolf", "Boehemia", "Vista Alegre", "Costa Verde", "Herend", "Royal Copenhagen"];
    const types = [
        "conjunto de jantar", "conjunto de chá", "conjunto de café", 
        "taças de cristal", "pratos de serviço", "saladeiras"
    ];
    
    const materials = [
        "porcelana fina", "cristal lapidado", "grés premium", 
        "cerâmica artesanal", "bone china", "porcelana translúcida"
    ];
    
    // Preços de referência do mercado (em USD)
    const marketPrices = {
        "Wolf": [50, 200],
        "Boehemia": [40, 180],
        "Vista Alegre": [60, 250],
        "Costa Verde": [30, 120],
        "Herend": [100, 400],
        "Royal Copenhagen": [80, 350]
    };
    
    // Taxa de câmbio aproximada USD to Kz
    const exchangeRate = 850;
    
    // Gerar 30 produtos para louças
    for (let i = 1; i <= 30; i++) {
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const material = materials[Math.floor(Math.random() * materials.length)];
        
        // Calcular preço (preço de mercado * 3 * taxa de câmbio)
        const priceRange = marketPrices[brand];
        const usdPrice = priceRange[0] + Math.random() * (priceRange[1] - priceRange[0]);
        const kzPrice = Math.round(usdPrice * exchangeRate * 3);
        
        window.productsData["loucas"].push({
            id: i,
            title: `${brand} - ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            description: `Conjunto de louças ${brand} em ${material}. ${type} de alta qualidade.`,
            price: `${kzPrice.toLocaleString('pt-PT')} Kz`,
            image: `loucas/${i}.jpg`, // CAMINHO CORRETO DA IMAGEM
            ref: `LC${i.toString().padStart(3, '0')}`
        });
    }
    
    console.log('Louças carregadas: ', window.productsData["loucas"].length);
});