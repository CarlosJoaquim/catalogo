// Dados dos jogos americanos
document.addEventListener('DOMContentLoaded', function() {
    const materials = [
        "Linho grosso de alta qualidade",
        "Linho fino premium",
        "Algodão biológico orgânico",
        "Algodão egípcio premium",
        "Tecido misto com bordado",
        "Linho com detalhes em renda"
    ];
    
    const designs = [
        "clássico", "moderno", "tradicional", "contemporâneo", 
        "rústico", "elegante", "minimalista", "ornamentado"
    ];
    
    const patterns = [
        "floral", "listras", "geométrico", "pintado à mão", 
        "bordado", "jacquard", "estampado", "liso"
    ];
    
    // Gerar 30 produtos para jogos americanos
    for (let i = 1; i <= 30; i++) {
        const material = materials[Math.floor(Math.random() * materials.length)];
        const design = designs[Math.floor(Math.random() * designs.length)];
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        
        // Preço entre 17.000 Kz e 36.000 Kz
        const price = (17000 + Math.floor(Math.random() * 19000)).toLocaleString('pt-PT') + " Kz";
        
        window.productsData["jogos-americanos"].push({
            id: i,
            title: `Jogo Americano ${i}`,
            description: `Jogo americano ${design} em ${material} com padrão ${pattern}. Perfeito para refeições elegantes.`,
            price: price,
            image: `jogos-americanos/${i}.jpg`,
            ref: `JA${i.toString().padStart(3, '0')}`
        });
    }
    
    console.log('Jogos Americanos carregados: ', window.productsData["jogos-americanos"].length);
});