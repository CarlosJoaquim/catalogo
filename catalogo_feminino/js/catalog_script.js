document.addEventListener('DOMContentLoaded', function() {
    // Array de dados dos produtos - APENAS 36 ITENS (Example subset provided)
    const products = [
        // --- Aventais de Cozinha (6 Itens: Modelos 001-006) ---
        {
            id: 1,
            model: "MOD-001",
            title: "Avental Chef Essencial",
            profession: "Cozinheiro(a) / Chef",
            category: "cozinha",
            price: "31.820,00 AOA Kz",
            image: "img/img1.png", 
            description: "Avental clássico e resistente, ideal para o ambiente profissional da cozinha.",
            features: ["Tecido 100% Algodão", "Alça ajustável", "Bolso frontal", "Resistente a lavagens"],
            composition: "100% Algodão"
        },
        {
            id: 2,
            model: "MOD-002",
            title: "Avental Bistro Elegance",
            profession: "Garçom / Barista",
            category: "cozinha",
            price: "28.200,00 AOA Kz",
            image: "img/img2.png",
            description: "Avental de cintura estilo bistrô, perfeito para um toque de elegância e praticidade.",
            features: ["Tecido misto", "Dois bolsos", "Tiras longas", "Acabamento profissional"],
            composition: "65% Poliéster / 35% Viscose"
        },
        {
            id: 3,
            model: "MOD-003",
            title: "Avental Couro Sintético",
            profession: "Churrasqueiro(a) / Artesão(ã)",
            category: "cozinha",
            price: "26.800,00 AOA Kz",
            image: "img/img3.png",
            description: "Avental robusto em couro sintético, oferece excelente proteção contra respingos e calor.",
            features: ["Material impermeável", "Fácil de limpar", "Alças ajustáveis", "Bolso grande"],
            composition: "100% Couro Sintético (PU)"
        },
        {
            id: 4,
            model: "MOD-004",
            title: "Avental Jeans Denim",
            profession: "Barista / Cervejeiro(a)",
            category: "cozinha",
            price: "25.300,00 AOA Kz",
            image: "img/img4.jpg",
            description: "Avental de jeans durável com detalhes em couro, ideal para um visual despojado e funcional.",
            features: ["Tecido jeans", "Detalhes em couro", "Vários bolsos", "Alças cruzadas"],
            composition: "100% Algodão Denim"
        },
        {
            id: 5,
            model: "MOD-005",
            title: "Avental de Padeiro",
            profession: "Padeiro(a) / Confeiteiro(a)",
            category: "cozinha",
            price: "31.820,00 AOA Kz",
            image: "img/img5.png",
            description: "Avental desenhado para padeiros, com tecido robusto que protege contra farinha e massa.",
            features: ["Tecido grosso", "Ampla cobertura", "Dois bolsos", "Cor neutra"],
            composition: "100% Algodão Grosso"
        },
        {
            id: 6,
            model: "MOD-006",
            title: "Avental Colorido de Cozinha",
            profession: "Cozinheiro(a)",
            category: "cozinha",
            price: "31.820,00 AOA Kz",
            image: "img/img6.png",
            description: "Avental vibrante e funcional. Perfeito para uso profissional ou doméstico.",
            features: ["Diversas cores vivas", "Tecido leve", "Fácil de lavar", "Bolso único"],
            composition: "100% Poliéster"
        },

        // --- Aventais para Cabeleireiros (6 Itens: Modelos 007-012) ---
        {
            id: 7,
            model: "MOD-007",
            title: "Avental Cabeleireiro Clássico",
            profession: "Cabeleireiro(a) / Barbeiro(a)",
            category: "cabeleireiro",
            price: "27.700,00 AOA Kz",
            image: "img/img7.jpg",
            description: "Avental essencial para profissionais de cabelo, protegendo contra tinturas e cortes.",
            features: ["Impermeável", "Antiestático", "Fecho ajustável", "Fácil de limpar"],
            composition: "100% Poliéster com PVC"
        },
        {
            id: 8,
            model: "MOD-008",
            title: "Avental Barber Premium",
            profession: "Barbeiro(a)",
            category: "cabeleireiro",
            price: "27.700,00 AOA Kz",
            image: "img/img8.jpg",
            description: "Avental robusto com estilo vintage para barbeiros, com bolsos específicos para ferramentas.",
            features: ["Lona encerada", "Detalhes em couro", "Bolsos para tesouras", "Alças cruzadas"],
            composition: "80% Lona / 20% Couro Bovino"
        },
        {
            id: 9,
            model: "MOD-009",
            title: "Avental Esteticista Elegante",
            profession: "Esteticista / Maquiador(a)",
            category: "cabeleireiro",
            price: "27.900,00 AOA Kz",
            image: "img/img9.jpg",
            description: "Avental com design elegante e caimento suave, ideal para profissionais de estética e maquiagem.",
            features: ["Tecido leve", "Resistente a manchas", "Design moderno", "Bolsos discretos"],
            composition: "95% Poliéster / 5% Elastano"
        },
        {
            id: 10,
            model: "MOD-010",
            title: "Avental Coloração Capilar",
            profession: "Colorista",
            category: "cabeleireiro",
            price: "27.900,00 AOA Kz",
            image: "img/img10.jpg",
            description: "Avental extra-resistente a produtos químicos, garantindo a proteção total durante processos de coloração.",
            features: ["Material PVC durável", "Resistente a tintas", "Superfície fácil de limpar", "Longa vida útil"],
            composition: "100% PVC Reforçado"
        },
        {
            id: 11,
            model: "MOD-011",
            title: "Avental Maquiador Compacto",
            profession: "Maquiador(a) / Artista",
            category: "cabeleireiro",
            price: "27.900,00 AOA Kz",
            image: "img/img11.jpg",
            description: "Avental menor e mais discreto, ideal para maquiadores que precisam de mobilidade e fácil acesso a pincéis.",
            features: ["Tamanho compacto", "Bolsos organizadores", "Leve", "Design clean"],
            composition: "90% Poliéster / 10% Nylon"
        },
        {
            id: 12,
            model: "MOD-012",
            title: "Avental Unissex de Salão",
            profession: "Todos os Profissionais de Salão",
            category: "cabeleireiro",
            price: "27.900,00 AOA Kz",
            image: "img/img12.jpg",
            description: "Avental versátil e unissex para uso geral em salões de beleza, garantindo proteção para diversas tarefas.",
            features: ["Durável e resistente", "Ajuste universal", "Bolso frontal", "Secagem rápida"],
            composition: "65% Poliéster / 35% Algodão"
        },

        // --- Jalecos Clínicos (6 Itens: Modelos 013-018) ---
        {
            id: 13,
            model: "MOD-013",
            title: "Jaleco Clínico Clássico",
            profession: "Clínico Geral",
            category: "medico",
            price: "18.900,00 AOA Kz",
            image: "img/img13.jpg",
            description: "Jaleco tradicional, proporcionando conforto e um visual profissional. Sem touca e avental.",
            features: ["Tecido de alta durabilidade", "3 bolsos", "Corte reto", "Resistente a descoloração"],
            composition: "65% Poliéster / 35% Algodão"
        },
        {
            id: 14,
            model: "MOD-014",
            title: "Jaleco Cirúrgico Completo",
            profession: "Cirurgião / Técnico",
            category: "medico",
            price: "18.900,00 AOA Kz",
            image: "img/img14.jpg",
            description: "Conjunto completo para ambientes cirúrgicos, máxima esterilidade e proteção. Inclui jaleco, touca e avental estéril.",
            features: ["Material estéril", "Descartável", "Resistente a fluidos", "Barreira bacteriana", "Inclui touca e avental"],
            composition: "100% Polipropileno SSMMS"
        },
        {
            id: 15,
            model: "MOD-015",
            title: "Jaleco Clínico Feminino Slim Fit",
            profession: "Especialista Clínico Feminino",
            category: "medico",
            price: "18.900,00 AOA Kz",
            image: "img/img15.jpg",
            description: "Jaleco com corte moderno e acinturado que valoriza a silhueta feminina. Sem touca e avental.",
            features: ["Design slim fit", "Tecido com elastano", "2 bolsos discretos", "Gola de lapela"],
            composition: "97% Poliéster / 3% Elastano"
        },
        {
            id: 16,
            model: "MOD-016",
            title: "Jaleco Clínico Masculino Esportivo",
            profession: "Fisioterapeuta / Educador Físico",
            category: "medico",
            price: "18.900,00 AOA Kz",
            image: "img/img16.jpg",
            description: "Jaleco com design mais esportivo e ergonômico. Acompanha touca.",
            features: ["Tecido stretch", "Design moderno", "Inclui touca", "Respirável"],
            composition: "90% Poliéster / 10% Elastano (Jaleco), 100% Poliéster (Touca)"
        },
        {
            id: 17,
            model: "MOD-017",
            title: "Jaleco Proteção Laboratório",
            profession: "Pesquisador / Químico",
            category: "medico",
            price: "110.700,00 AOA Kz",
            image: "img/img17.jpg",
            description: "Jaleco reforçado para laboratórios, proteção extra contra químicos e respingos. Acompanha avental impermeável.",
            features: ["Resistente a químicos", "Punhos ajustáveis", "Botões de pressão", "Inclui avental impermeável"],
            composition: "80% Poliéster / 20% Algodão (Jaleco), 100% PVC (Avental)"
        },
        {
            id: 18,
            model: "MOD-018",
            title: "Jaleco Clínico Unissex",
            profession: "Dentista / Auxiliar Clínico",
            category: "medico",
            price: "90.700,00 AOA Kz",
            image: "img/img18.jpg",
            description: "Jaleco prático e confortável para o dia a dia no ambiente clínico. Sem touca e avental.",
            features: ["Design unissex", "Tecido resistente", "Bolso para instrumentos", "Fácil esterilização"],
            composition: "70% Poliéster / 30% Algodão"
        },

        // --- Jalecos Enfermagem (6 Itens: Modelos 019-024) ---
        {
            id: 19,
            model: "MOD-019",
            title: "Jaleco Enfermagem Essencial",
            profession: "Enfermeiro / Auxiliar de Enfermagem",
            category: "enfermagem",
            price: "27.900,00 AOA Kz",
            image: "img/img19.jpg",
            description: "Jaleco padrão para o setor de enfermagem, priorizando funcionalidade e conforto. Sem touca e avental.",
            features: ["Tecido fácil de desinfetar", "4 bolsos", "Resistente a manchas", "Design ergonômico"],
            composition: "65% Poliéster / 35% Algodão"
        },
        {
            id: 20,
            model: "MOD-020",
            title: "Jaleco Enfermagem Colorido",
            profession: "Enfermeiro Pediátrico",
            category: "enfermagem",
            price: "27.900,00 AOA Kz",
            image: "img/img20.jpg",
            description: "Jaleco colorido com touca combinando, ideal para ambientes que buscam um toque de alegria. Com touca.",
            features: ["Cores vibrantes", "Tecido macio", "Touca inclusa", "Fácil de lavar"],
            composition: "100% Algodão (Jaleco, Touca)"
        },
        {
            id: 21,
            model: "MOD-021",
            title: "Jaleco Enfermagem Proteção Extra",
            profession: "Enfermeiro UTI / Emergência",
            category: "enfermagem",
            price: "89.300,00 AOA Kz",
            image: "img/img21.jpg",
            description: "Jaleco reforçado com avental acoplado para proteção adicional em situações de alto risco. Apenas com avental.",
            features: ["Barreira a fluidos", "Avental removível e impermeável", "Punhos elásticos", "Segurança garantida"],
            composition: "70% Poliéster / 30% Algodão (Jaleco), 100% PVC (Avental)"
        },
        {
            id: 22,
            model: "MOD-022",
            title: "Jaleco Enfermagem Design Moderno",
            profession: "Enfermeiro Esteticista",
            category: "enfermagem",
            price: "33.00,00 AOA Kz",
            image: "img/img22.jpg",
            description: "Jaleco com corte contemporâneo e ajuste perfeito, ideal para profissionais que buscam um visual sofisticado. Sem touca e avental.",
            features: ["Corte slim", "Tecido com elastano", "Bolsos invisíveis", "Antimicrobiano"],
            composition: "95% Poliéster / 5% Elastano"
        },
        {
            id: 23,
            model: "MOD-023",
            title: "Jaleco Enfermagem Masculino",
            profession: "Enfermeiro Chefe",
            category: "enfermagem",
            price: "30.800,00 AOA Kz",
            image: "img/img23.jpg",
            description: "Jaleco masculino clássico, com corte que proporciona mobilidade e profissionalismo. Sem touca e avental.",
            features: ["Corte reto", "Tecido resistente a amassados", "Três bolsos", "Punhos com botão"],
            composition: "65% Poliéster / 35% Algodão"
        },
        {
            id: 24,
            model: "MOD-024",
            title: "Jaleco Enfermagem com Zíper",
            profession: "Enfermeiro Plantonista",
            category: "enfermagem",
            price: "30.800,00 AOA Kz",
            image: "img/img24.jpg",
            description: "Jaleco com zíper frontal para maior praticidade ao vestir e despir, ideal para plantões e emergências. Sem touca e avental.",
            features: ["Zíper frontal reforçado", "Secagem rápida", "Bolsos laterais com zíper", "Conforto para longas horas"],
            composition: "100% Poliéster"
        },

        // --- Jalecos de Pediatria (6 Itens: Modelos 025-030) ---
        {
            id: 25,
            model: "MOD-025",
            title: "Jaleco Pediatria Super Heróis",
            profession: "Pediatra / Médico Infantil",
            category: "pediatria",
            price: "27.900,00 AOA Kz",
            image: "img/img25.jpg",
            description: "Jaleco com estampas de super-heróis e touca combinando, para tornar a consulta divertida. Com touca.",
            features: ["Estampas vibrantes", "Tecido macio e hipoalergênico", "Touca temática inclusa", "Fácil limpeza"],
            composition: "100% Algodão Premium (Jaleco, Touca)"
        },
        {
            id: 26,
            model: "MOD-026",
            title: "Jaleco Pediatria Bichinhos",
            profession: "Enfermeiro Pediátrico",
            category: "pediatria",
            price: "27.900,00 AOA Kz",
            image: "img/img26.jpg",
            description: "Jaleco com divertidas estampas de animais, ideal para criar um ambiente amigável e acolhedor. Sem touca e avental.",
            features: ["Padrão de animais fofos", "Tecido suave e resistente", "2 bolsos", "Lavável em máquina"],
            composition: "65% Poliéster / 35% Algodão"
        },
        {
            id: 27,
            model: "MOD-027",
            title: "Jaleco Pediatria Neutro",
            profession: "Fisioterapeuta Pediátrico",
            category: "pediatria",
            price: "27.900,00 AOA Kz",
            image: "img/img27.jpg",
            description: "Jaleco em cor neutra, com avental impermeável discreto, para profissionais que precisam de proteção. Apenas com avental.",
            features: ["Cor neutra", "Avental de proteção impermeável", "Tecido respirável", "Conforto para sessões"],
            composition: "70% Poliéster / 30% Algodão (Jaleco), 100% Poliuretano (Avental)"
        },
        {
            id: 28,
            model: "MOD-028",
            title: "Conjunto Lúdico Infantil", // Renamed for clarity in Pediatria
            profession: "Educador Infantil / Recreador",
            category: "pediatria", // Changed from 'fatosocial' for Pediatria focus
            price: "133.800,00 AOA Kz",
            image: "img/img28.png",
            description: "Conjunto completo com estampas de brinquedos, touca e avental, ideal para sessões lúdicas e interativas com crianças. Com touca e avental.",
            features: ["Estampas de brinquedos", "Tecido resistente", "Inclui touca e avental", "Estimula a interação"],
            composition: "80% Algodão / 20% Poliéster (Jaleco, Touca, Avental)"
        },
        {
            id: 29,
            model: "MOD-029",
            title: "Jaleco para Berçário",
            profession: "Cuidador de Berçário",
            category: "pediatria",
            price: "38.300,00 AOA Kz",
            image: "img/img29.png",
            description: "Jaleco leve e super macio, projetado para o conforto e a segurança em berçários. Sem touca e avental.",
            features: ["Tecido extra macio", "Hipoalergênico", "Fácil de lavar", "Sem peças soltas"],
            composition: "100% Algodão Jersey"
        },
        {
            id: 30,
            model: "MOD-030",
            title: "Jaleco Espacial Infantil", // Renamed for clarity in Pediatria
            profession: "Médico do Sono Infantil",
            category: "pediatria", // Changed from 'jaleco' for Pediatria focus
            price: "34.000,00 AOA Kz",
            image: "img/img30.png",
            description: "Jaleco com tema espacial e touca estrelada, para ajudar as crianças a se sentirem em uma aventura. Com touca.",
            features: ["Estampa de planetas e estrelas", "Tecido respirável", "Touca temática", "Cores vibrantes"],
            composition: "60% Algodão / 40% Poliéster (Jaleco, Touca)"
        },
        
        // --- NEW CATEGORIES: Fato Social and Conjuntos Profissionais ---
        // (Adding placeholder items for these categories to reach closer to 36 total, as per request)
        // Adjust these as needed for your actual product offerings
        {
            id: 31,
            model: "MOD-031",
            title: "Fato Social Clássico Masculino",
            profession: "Executivo / Eventos Formais",
            category: "fatosocial",
            price: "150.000,00 AOA Kz",
            image: "img/fatosocial_m_01.jpg", // Placeholder image
            description: "Fato social de corte clássico, ideal para reuniões de negócios e eventos formais. Confeccionado em tecido de alta qualidade para um caimento impecável.",
            features: ["Tecido de lã misto premium", "Corte slim-fit", "Forro interno", "Lapela clássica"],
            composition: "70% Lã / 30% Poliéster"
        },
        {
            id: 32,
            model: "MOD-032",
            title: "Fato Social Feminino Elegante",
            profession: "Executiva / Cerimónias",
            category: "fatosocial",
            price: "135.000,00 AOA Kz",
            image: "img/fatosocial_f_01.jpg", // Placeholder image
            description: "Conjunto de blazer e calça/saia com design moderno e sofisticado, perfeito para o ambiente corporativo e eventos especiais.",
            features: ["Tecido acetinado", "Corte acinturado", "Detalhes em botões dourados", "Conforto e estilo"],
            composition: "95% Poliéster / 5% Elastano"
        },
        {
            id: 33,
            model: "MOD-033",
            title: "Conjunto Secretária Executiva",
            profession: "Secretária / Assistente Administrativa",
            category: "conjunto",
            price: "85.000,00 AOA Kz",
            image: "img/conjunto_sec_01.jpg", // Placeholder image
            description: "Conjunto profissional que combina blusa elegante e saia lápis, ideal para o dia a dia no escritório. Confortável e sofisticado.",
            features: ["Tecido respirável", "Design discreto", "Fácil de lavar e passar", "Disponível em várias cores"],
            composition: "60% Viscose / 40% Poliéster"
        },
        {
            id: 34,
            model: "MOD-034",
            title: "Conjunto Manutenção Industrial",
            profession: "Técnico de Manutenção / Operário",
            category: "conjunto",
            price: "70.000,00 AOA Kz",
            image: "img/conjunto_ind_01.jpg", // Placeholder image
            description: "Conjunto robusto de camisa e calça com bolsos reforçados, projetado para durabilidade e segurança em ambientes industriais.",
            features: ["Tecido ripstop resistente", "Costuras reforçadas", "Bolsos utilitários", "Cores de alta visibilidade"],
            composition: "100% Algodão Workwear"
        },
        {
            id: 35,
            model: "MOD-035",
            title: "Bata de Trabalho Multiuso",
            profession: "Diversas Profissões",
            category: "conjunto", // Placing it under conjuntos as a general workwear item
            price: "45.000,00 AOA Kz",
            image: "img/bata_multi_01.jpg", // Placeholder image
            description: "Bata prática e confortável para uso em diversos ambientes de trabalho, como oficinas, laboratórios ou indústrias leves.",
            features: ["Tecido durável", "Fecho frontal com botões", "2 bolsos grandes", "Fácil de vestir"],
            composition: "65% Poliéster / 35% Algodão"
        },
        {
            id: 36,
            model: "MOD-036",
            title: "Conjunto Médico Odontológico",
            profession: "Dentista / Higienista Dental",
            category: "conjunto", // A specific medical uniform set
            price: "95.000,00 AOA Kz",
            image: "img/conjunto_odonto_01.jpg", // Placeholder image
            description: "Conjunto completo de scrubs (blusa e calça) com design ergonômico e tecido anti-bacteriano, ideal para clínicas odontológicas.",
            features: ["Tecido antimicrobiano", "Liberdade de movimento", "Bolsos funcionais", "Cores resistentes ao cloro"],
            composition: "90% Poliéster / 10% Elastano"
        }
    ];

    // --- DOM Element Management ---
    const catalogContainer = document.getElementById('catalog');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productModal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalModel = document.getElementById('modalModel');
    const modalPrice = document.getElementById('modalPrice');
    const closeModalButton = document.getElementById('closeModal');
    const menuToggle = document.getElementById('menuToggle');
    const categoryFilter = document.getElementById('categoryFilter');
    const closeMenuButton = document.getElementById('closeMenu');

    /**
     * Generates and displays product cards in the catalog, applying filters.
     * @param {string} filter - The category to filter products ('all' for all products).
     */
    function generateProductCards(filter = 'all') {
        catalogContainer.innerHTML = ''; // Clear current content
        
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(product => product.category === filter);
        
        if (filteredProducts.length === 0) {
            catalogContainer.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: var(--light-text);">Nenhum produto encontrado nesta categoria.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-badge">${product.model}</div>
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <div class="product-model">${product.model}</div>
                    <div class="product-price">${product.price}</div>
                </div>
            `;
            
            productCard.addEventListener('click', () => openProductModal(product));
            
            catalogContainer.appendChild(productCard);
        });
    }

    /**
     * Opens the product detail modal and populates it with selected product info.
     * Only model and price are displayed in the modal as per current design.
     * @param {object} product - The product object to display.
     */
    function openProductModal(product) {
        modalImage.src = product.image;
        modalImage.alt = product.title;
        modalModel.textContent = product.model;
        modalPrice.textContent = product.price;
        
        productModal.classList.add('active');
        document.body.classList.add('modal-open'); // Add class to body to prevent scroll
    }

    /**
     * Closes the product detail modal.
     */
    function closeProductModal() {
        productModal.classList.remove('active');
        document.body.classList.remove('modal-open'); // Remove class from body to re-enable scroll
    }

    // --- Event Listeners ---

    // Filter buttons click event
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-category');
            generateProductCards(category);
            // Close mobile menu after selection
            categoryFilter.classList.remove('active');
            // No need to remove 'modal-open' from body here as it might be needed for the modal
            // It's specifically handled by closeProductModal.
        });
    });

    // Close modal button click event
    closeModalButton.addEventListener('click', closeProductModal);
    
    // Close modal when clicking outside modal content
    productModal.addEventListener('click', function(e) {
        // Check if the click occurred directly on the modal overlay (not inside modal-content)
        if (e.target === this) {
            closeProductModal();
        }
    });
    
    // Close modal with 'ESC' key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && productModal.classList.contains('active')) {
            closeProductModal();
        }
    });

    // Toggle mobile menu (open)
    menuToggle.addEventListener('click', () => {
        categoryFilter.classList.add('active');
        document.body.classList.add('modal-open'); // Prevent body scroll when menu is open
    });

    // Close mobile menu
    closeMenuButton.addEventListener('click', () => {
        categoryFilter.classList.remove('active');
        document.body.classList.remove('modal-open'); // Re-enable body scroll
    });

    // --- Initialization ---
    // Generate product cards on initial page load (show all)
    generateProductCards();
});