// Dados das toalhas de mesa
document.addEventListener('DOMContentLoaded', function() {
    const sizes = [
        "para 4 lugares", "para 6 lugares", "para 8 lugares", 
        "para 10 lugares", "para 12 lugares", "para 14 lugares"
    ];
    
    const materials = [
        "algodão egípcio de alta qualidade",
        "linho premium",
        "mescla de algodão e poliéster",
        "jacquard elegante",
        "orgânico sustentável",
        "tecido com fio dourado"
    ];
    
    const occasions = [
        "ocasiões especiais", "jantares formais", "eventos familiares", 
        "celebrações", "jantares românticos", "festas temáticas"
    ];
    
    // Gerar 30 produtos para toalhas de mesa
    for (let i = 1; i <= 30; i++) {
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const material = materials[Math.floor(Math.random() * materials.length)];
        const occasion = occasions[Math.floor(Math.random() * occasions.length)];
        
        // Preço baseado no tamanho
        let price;
        if (size.includes("4")) price = (187000 + Math.floor(Math.random() * 20000)).toLocaleString('pt-PT');
        else if (size.includes("6")) price = (220000 + Math.floor(Math.random() * 30000)).toLocaleString('pt-PT');
        else if (size.includes("8")) price = (260000 + Math.floor(Math.random() * 40000)).toLocaleString('pt-PT');
        else if (size.includes("10")) price = (310000 + Math.floor(Math.random() * 50000)).toLocaleString('pt-PT');
        else if (size.includes("12")) price = (370000 + Math.floor(Math.random() * 60000)).toLocaleString('pt-PT');
        else price = (450000 + Math.floor(Math.random() * 70000)).toLocaleString('pt-PT');
        
        window.productsData["toalhas-mesa"].push({
            id: i,
            title: `Toalha de Mesa ${size.charAt(0).toUpperCase() + size.slice(1)}`,
            description: `Toalha de mesa ${size} em ${material}. Ideal para ${occasion}.`,
            price: `${price} Kz`,
            image: `toalhas-mesa/${i}.jpg`,
            ref: `TM${i.toString().padStart(3, '0')}`
        });
    }
    
    console.log('Toalhas de Mesa carregadas: ', window.productsData["toalhas-mesa"].length);
});