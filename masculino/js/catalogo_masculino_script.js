document.addEventListener('DOMContentLoaded', function() {
    // Array de dados dos produtos - Todos os produtos focados no vestuário masculino
    const products = [
        // --- Aventais de Cozinha (6 Itens: Modelos 001-006) ---
        {
            id: 1,
            model: "MOD-M-001",
            title: "Avental Chef Essencial Masculino",
            profession: "Cozinheiro / Chef",
            category: "cozinha",
            price: "31.820,00 AOA Kz",
            image: "img/avental_masculino/chef_essential_m.png", // Masculine image
            description: "Avental clássico e resistente, ideal para o ambiente profissional da cozinha. Design pensado para o conforto masculino.",
            features: ["Tecido 100% Algodão de alta densidade", "Alça de pescoço ajustável", "Bolso frontal espaçoso", "Resistente a lavagens industriais"],
            composition: "100% Algodão"
        },
        {
            id: 2,
            model: "MOD-M-002",
            title: "Avental Barista Premium Masculino",
            profession: "Barista / Barman",
            category: "cozinha", // Fits under kitchen/food service
            price: "28.200,00 AOA Kz",
            image: "img/avental_masculino/barista_m.png", // Masculine image
            description: "Avental de cintura estilo bistrô, com acabamento premium e bolsos práticos para baristas masculinos. Toque de sofisticação.",
            features: ["Tecido misto anti-manchas", "Dois bolsos laterais grandes", "Tiras longas para ajuste personalizado", "Ideal para ambientes modernos"],
            composition: "65% Poliéster / 35% Viscose"
        },
        {
            id: 3,
            model: "MOD-M-003",
            title: "Avental Churrasqueiro Couro Sintético",
            profession: "Churrasqueiro / Grelhador",
            category: "cozinha",
            price: "26.800,00 AOA Kz",
            image: "img/avental_masculino/churrasqueiro_m.png", // Masculine image
            description: "Avental robusto em couro sintético, oferece excelente proteção contra respingos e calor. Estilo rústico e masculino.",
            features: ["Material impermeável de fácil limpeza", "Fivelas metálicas ajustáveis", "Bolso frontal com divisórias", "Resistente a altas temperaturas"],
            composition: "100% Couro Sintético (PU)"
        },
        {
            id: 4,
            model: "MOD-M-004",
            title: "Avental Jeans Denim com Detalhes Couro",
            profession: "Artesão / Cervejeiro",
            category: "cozinha",
            price: "25.300,00 AOA Kz",
            image: "img/avental_masculino/denim_m.png", // Masculine image
            description: "Avental de jeans durável com detalhes em couro legítimo, ideal para um visual despojado e funcional. Conforto e resistência.",
            features: ["Tecido denim pesado", "Alças ajustáveis de couro genuíno", "Vários bolsos utilitários", "Design moderno e prático"],
            composition: "100% Algodão Denim"
        },
        {
            id: 5,
            model: "MOD-M-005",
            title: "Avental Padeiro Profissional Masculino",
            profession: "Padeiro / Confeiteiro",
            category: "cozinha",
            price: "31.820,00 AOA Kz",
            image: "img/avental_masculino/padeiro_m.png", // Masculine image
            description: "Avental desenhado para padeiros, com tecido robusto que protege contra farinha e massa. Ampla cobertura frontal.",
            features: ["Tecido grosso e absorvente", "Ampla cobertura para máxima proteção", "Bolsos frontais práticos", "Design clássico em cor neutra"],
            composition: "100% Algodão Grosso"
        },
        {
            id: 6,
            model: "MOD-M-006",
            title: "Avental Higiene Alimentar Masculino",
            profession: "Manipulador de Alimentos",
            category: "cozinha",
            price: "31.820,00 AOA Kz",
            image: "img/avental_masculino/higiene_m.png", // Masculine image
            description: "Avental leve e funcional, ideal para ambientes de manipulação de alimentos. Fácil de higienizar e confortável para longas horas.",
            features: ["Material impermeável e respirável", "Fácil de limpar e secar", "Alças ajustáveis para melhor caimento", "Design simples e higiênico"],
            composition: "100% Poliéster"
        },

        // --- Aventais para Barbearia (6 Itens: Modelos 007-012) ---
        {
            id: 7,
            model: "MOD-M-007",
            title: "Avental Barbeiro Clássico",
            profession: "Barbeiro",
            category: "barbeiro",
            price: "27.700,00 AOA Kz",
            image: "img/avental_masculino/barber_classic_m.png", // Masculine image
            description: "Avental essencial para barbeiros, protegendo contra cabelos e produtos. Design atemporal e funcional.",
            features: ["Tecido resistente a pelos", "Fácil de limpar", "Alça de pescoço ajustável", "Bolso frontal utilitário"],
            composition: "65% Poliéster / 35% Algodão"
        },
        {
            id: 8,
            model: "MOD-M-008",
            title: "Avental Barbeiro Estilizado",
            profession: "Barbeiro / Estilista",
            category: "barbeiro",
            price: "27.700,00 AOA Kz",
            image: "img/avental_masculino/barber_style_m.png", // Masculine image
            description: "Avental com design moderno e detalhes em couro, ideal para barbeiros que buscam estilo e praticidade.",
            features: ["Lona resistente com detalhes em couro", "Bolsos específicos para ferramentas", "Alças cruzadas para conforto", "Visual premium"],
            composition: "80% Lona / 20% Couro Sintético"
        },
        {
            id: 9,
            model: "MOD-M-009",
            title: "Capa de Corte Masculina Premium",
            profession: "Cabeleireiro / Barbeiro",
            category: "barbeiro",
            price: "27.900,00 AOA Kz",
            image: "img/avental_masculino/cutting_cape_m.png", // Masculine image
            description: "Capa de corte masculina, leve e impermeável, com fecho ajustável para conforto do cliente.",
            features: ["Material anti-estático", "Impermeável", "Fecho ajustável no pescoço", "Tamanho grande para cobertura total"],
            composition: "100% Poliéster Impermeável"
        },
        {
            id: 10,
            model: "MOD-M-010",
            title: "Avental de Tintura Masculino",
            profession: "Colorista Masculino",
            category: "barbeiro",
            price: "27.900,00 AOA Kz",
            image: "img/avental_masculino/colorist_m.png", // Masculine image
            description: "Avental extra-resistente a produtos químicos, garantindo a proteção total durante processos de coloração para homens.",
            features: ["Material resistente a tintas e produtos químicos", "Superfície fácil de limpar", "Alças confortáveis", "Longa vida útil"],
            composition: "100% PVC Reforçado"
        },
        {
            id: 11,
            model: "MOD-M-011",
            title: "Avental Profissional Multi-Bolsos",
            profession: "Estilista / Groomer",
            category: "barbeiro",
            price: "27.900,00 AOA Kz",
            image: "img/avental_masculino/multi_pocket_m.png", // Masculine image
            description: "Avental com vários bolsos, ideal para organizar ferramentas e acessórios. Design prático e resistente.",
            features: ["Múltiplos bolsos organizadores", "Tecido durável", "Alças ajustáveis", "Conforto para o dia a dia"],
            composition: "60% Algodão / 40% Poliéster"
        },
        {
            id: 12,
            model: "MOD-M-012",
            title: "Avental de Cabeleireiro Unissex (Masculino)",
            profession: "Cabeleireiro",
            category: "barbeiro",
            price: "27.900,00 AOA Kz",
            image: "img/avental_masculino/unisex_salon_m.png", // Masculine image
            description: "Avental versátil para uso geral em salões, com foco em profissionais masculinos, garantindo proteção para diversas tarefas.",
            features: ["Durável e resistente a pelos", "Ajuste universal", "Bolso frontal grande", "Secagem rápida"],
            composition: "100% Poliéster"
        },

        // --- Jalecos Clínicos Masculinos (6 Itens: Modelos 013-018) ---
        {
            id: 13,
            model: "MOD-M-013",
            title: "Jaleco Clínico Clássico Masculino",
            profession: "Clínico Geral",
            category: "medico",
            price: "18.900,00 AOA Kz",
            image: "img/jaleco_masculino/classic_med_m.png", // Masculine image
            description: "Jaleco tradicional, proporcionando conforto e um visual profissional masculino. Sem touca e avental.",
            features: ["Tecido de alta durabilidade", "Três bolsos funcionais", "Corte reto e clássico", "Resistente a descoloração e amassados"],
            composition: "65% Poliéster / 35% Algodão"
        },
        {
            id: 14,
            model: "MOD-M-014",
            title: "Jaleco Cirúrgico Masculino Completo",
            profession: "Cirurgião / Técnico Cirúrgico",
            category: "medico",
            price: "18.900,00 AOA Kz",
            image: "img/jaleco_masculino/surgical_m.png", // Masculine image
            description: "Conjunto completo para ambientes cirúrgicos, máxima esterilidade e proteção. Inclui jaleco, touca e avental estéril para homens.",
            features: ["Material estéril e respirável", "Descartável para máxima higiene", "Barreira robusta contra fluidos", "Proteção bacteriana avançada", "Inclui touca e avental"],
            composition: "100% Polipropileno SSMMS"
        },
        {
            id: 15,
            model: "MOD-M-015",
            title: "Jaleco Clínico Esportivo Masculino",
            profession: "Fisioterapeuta / Educador Físico",
            category: "medico",
            price: "18.900,00 AOA Kz",
            image: "img/jaleco_masculino/sporty_med_m.png", // Masculine image
            description: "Jaleco com design mais esportivo e ergonômico, ideal para profissionais masculinos com alta mobilidade. Acompanha touca.",
            features: ["Tecido stretch para maior conforto", "Design moderno e ajuste atlético", "Inclui touca combinando", "Material respirável e de secagem rápida"],
            composition: "90% Poliéster / 10% Elastano (Jaleco), 100% Poliéster (Touca)"
        },
        {
            id: 16,
            model: "MOD-M-016",
            title: "Jaleco Laboratório Masculino Reforçado",
            profession: "Pesquisador / Químico",
            category: "medico",
            price: "110.700,00 AOA Kz",
            image: "img/jaleco_masculino/lab_protect_m.png", // Masculine image
            description: "Jaleco reforçado para laboratórios, proteção extra contra químicos e respingos. Acompanha avental impermeável.",
            features: ["Altamente resistente a produtos químicos e abrasão", "Punhos ajustáveis com elástico ou botão", "Fecho frontal com botões de pressão", "Inclui avental impermeável de PVC"],
            composition: "80% Poliéster / 20% Algodão (Jaleco), 100% PVC (Avental)"
        },
        {
            id: 17,
            model: "MOD-M-017",
            title: "Jaleco Clínico Masculino Slim Fit",
            profession: "Especialista Clínico Masculino",
            category: "medico",
            price: "18.900,00 AOA Kz",
            image: "img/jaleco_masculino/slim_fit_med_m.png", // Masculine image
            description: "Jaleco com corte moderno e ajustado que proporciona um visual sofisticado e profissional para homens. Sem touca e avental.",
            features: ["Design slim fit contemporâneo", "Tecido com elastano para flexibilidade", "Bolsos discretos e funcionais", "Gola de lapela elegante"],
            composition: "97% Poliéster / 3% Elastano"
        },
        {
            id: 18,
            model: "MOD-M-018",
            title: "Jaleco Clínico Unissex (Foco Masculino)",
            profession: "Dentista / Auxiliar Clínico",
            category: "medico",
            price: "90.700,00 AOA Kz",
            image: "img/jaleco_masculino/unisex_med_m.png", // Masculine image
            description: "Jaleco prático e confortável para o dia a dia no ambiente clínico, com um corte que se adapta bem ao corpo masculino. Sem touca e avental.",
            features: ["Design unissex versátil", "Tecido resistente e de fácil manutenção", "Bolso no peito para instrumentos", "Fácil esterilização e secagem rápida"],
            composition: "70% Poliéster / 30% Algodão"
        },

        // --- Jalecos Enfermagem Masculinos (6 Itens: Modelos 019-024) ---
        {
            id: 19,
            model: "MOD-M-019",
            title: "Jaleco Enfermagem Essencial Masculino",
            profession: "Enfermeiro / Auxiliar de Enfermagem",
            category: "enfermagem",
            price: "27.900,00 AOA Kz",
            image: "img/jaleco_masculino/nurse_essential_m.png", // Masculine image
            description: "Jaleco padrão para o setor de enfermagem, priorizando funcionalidade e conforto para o profissional masculino. Sem touca e avental.",
            features: ["Tecido fácil de desinfetar e antimanchas", "Quatro bolsos frontais práticos", "Resistente a manchas e líquidos", "Design ergonômico para longas jornadas"],
            composition: "65% Poliéster / 35% Algodão"
        },
        {
            id: 20,
            model: "MOD-M-020",
            title: "Jaleco Enfermagem Respirável Masculino",
            profession: "Enfermeiro de Urgência",
            category: "enfermagem",
            price: "27.900,00 AOA Kz",
            image: "img/jaleco_masculino/nurse_breathable_m.png", // Masculine image
            description: "Jaleco leve e respirável, ideal para ambientes de ritmo acelerado. Com touca combinando para máxima higiene.",
            features: ["Material de alta respirabilidade", "Tecido macio e flexível", "Touca inclusa para proteção capilar", "Secagem rápida e fácil de lavar"],
            composition: "100% Poliéster Microfibra (Jaleco, Touca)"
        },
        {
            id: 21,
            model: "MOD-M-021",
            title: "Jaleco Enfermagem Proteção Avançada",
            profession: "Enfermeiro UTI / Emergência",
            category: "enfermagem",
            price: "89.300,00 AOA Kz",
            image: "img/jaleco_masculino/nurse_advanced_m.png", // Masculine image
            description: "Jaleco reforçado com avental acoplado para proteção adicional em situações de alto risco. Apenas com avental.",
            features: ["Barreira robusta contra fluidos corporais", "Avental removível e 100% impermeável", "Punhos elásticos para vedação segura", "Oferece segurança e tranquilidade"],
            composition: "70% Poliéster / 30% Algodão (Jaleco), 100% PVC (Avental)"
        },
        {
            id: 22,
            model: "MOD-M-022",
            title: "Jaleco Enfermagem Moderno Masculino",
            profession: "Enfermeiro Supervisor",
            category: "enfermagem",
            price: "33.00,00 AOA Kz",
            image: "img/jaleco_masculino/nurse_modern_m.png", // Masculine image
            description: "Jaleco com corte contemporâneo e ajuste perfeito, ideal para profissionais masculinos que buscam um visual sofisticado. Sem touca e avental.",
            features: ["Corte slim para uma silhueta elegante", "Tecido com elastano para flexibilidade", "Bolsos discretos e funcionais", "Tratamento antimicrobiano para higiene extra"],
            composition: "95% Poliéster / 5% Elastano"
        },
        {
            id: 23,
            model: "MOD-M-023",
            title: "Jaleco Enfermagem Masculino Clássico",
            profession: "Enfermeiro Chefe",
            category: "enfermagem",
            price: "30.800,00 AOA Kz",
            image: "img/jaleco_masculino/nurse_chief_m.png", // Masculine image
            description: "Jaleco masculino clássico, com corte que proporciona mobilidade e um visual profissional imponente. Sem touca e avental.",
            features: ["Corte reto e estruturado", "Tecido resistente a amassados, ideal para o dia a dia", "Três bolsos para organização de instrumentos", "Punhos com botão para um acabamento elegante"],
            composition: "65% Poliéster / 35% Algodão"
        },
        {
            id: 24,
            model: "MOD-M-024",
            title: "Jaleco Enfermagem com Zíper Masculino",
            profession: "Enfermeiro Plantonista",
            category: "enfermagem",
            price: "30.800,00 AOA Kz",
            image: "img/jaleco_masculino/nurse_zipper_m.png", // Masculine image
    description: "Jaleco com zíper frontal para maior praticidade ao vestir e despir, ideal para plantões e emergências. Sem touca e avental.",
            features: ["Zíper frontal reforçado para durabilidade", "Tecido de secagem rápida", "Bolsos laterais com zíper de segurança", "Proporciona conforto para longas horas de trabalho"],
            composition: "100% Poliéster"
        },

        // --- Fatos Sociais Masculinos (6 Itens: Modelos 025-030) ---
        {
            id: 25,
            model: "MOD-M-025",
            title: "Fato Social Clássico Negro",
            profession: "Executivo / Eventos Formais",
            category: "fatosocial",
            price: "150.000,00 AOA Kz",
            image: "img/fatos_sociais_masculino/social_suit_black_m.png", // Masculine image
            description: "Fato social de corte clássico na cor preta, ideal para reuniões de negócios e eventos formais. Confeccionado em tecido de alta qualidade para um caimento impecável.",
            features: ["Tecido de lã misto premium", "Corte slim-fit ou regular", "Forro interno de seda/acetato", "Lapela clássica entalhada ou pontiaguda"],
            composition: "70% Lã / 30% Poliéster"
        },
        {
            id: 26,
            model: "MOD-M-026",
            title: "Fato Social Azul Marinho Elegante",
            profession: "Profissional Liberal / Casamento",
            category: "fatosocial",
            price: "145.000,00 AOA Kz",
            image: "img/fatos_sociais_masculino/social_suit_navy_m.png", // Masculine image
            description: "Fato social em azul marinho, uma alternativa moderna e sofisticada ao preto. Versátil para ambientes corporativos e celebrações.",
            features: ["Tecido premium anti-rugas", "Ajuste moderno e confortável", "Detalhes de alfaiataria", "Cor versátil para diversas ocasiões"],
            composition: "80% Lã / 20% Viscose"
        },
        {
            id: 27,
            model: "MOD-M-027",
            title: "Fato Social Cinza Grafite",
            profession: "Gestor / Negócios",
            category: "fatosocial",
            price: "148.000,00 AOA Kz",
            image: "img/fatos_sociais_masculino/social_suit_grey_m.png", // Masculine image
            description: "Fato social na cor cinza grafite, que transmite seriedade e profissionalismo. Perfeito para o dia a dia corporativo.",
            features: ["Tecido durável e elegante", "Corte contemporâneo", "Fácil de combinar com camisas e gravatas", "Ideal para uso frequente"],
            composition: "60% Lã / 40% Poliéster"
        },
        {
            id: 28,
            model: "MOD-M-028",
            title: "Fato Social Slim Fit Moderno",
            profession: "Jovem Executivo / Eventos Sociais",
            category: "fatosocial",
            price: "155.000,00 AOA Kz",
            image: "img/fatos_sociais_masculino/social_suit_slim_m.png", // Masculine image
            description: "Fato social com corte slim fit, para um visual mais ajustado e moderno. Ideal para quem busca estilo sem abrir mão da formalidade.",
            features: ["Corte super slim fit", "Tecido com elastano para conforto", "Lapela fina", "Disponível em cores tendenciosas (ex: vinho, verde escuro)"],
            composition: "95% Poliéster / 5% Elastano"
        },
        {
            id: 29,
            model: "MOD-M-029",
            title: "Fato Social Completo (3 Peças)",
            profession: "Noivo / Padrinho / Gala",
            category: "fatosocial",
            price: "220.000,00 AOA Kz",
            image: "img/fatos_sociais_masculino/social_suit_3_piece_m.png", // Masculine image
            description: "Fato social de 3 peças (casaco, colete e calça), que oferece um nível extra de elegância e formalidade. Perfeito para ocasiões especiais.",
            features: ["Tecido de luxo", "Colete ajustável", "Acabamento impecável", "Ideal para eventos de gala e casamentos"],
            composition: "100% Lã Super 120s"
        },
        {
            id: 30,
            model: "MOD-M-030",
            title: "Fato Safari Masculino Urbano",
            profession: "Aventureiro Urbano / Casual Chique",
            category: "fatosocial", // Can also be for casual/semi-formal male wear
            price: "97.000,00 AOA Kz",
            image: "img/fatos_sociais_masculino/safari_suit_urban_m.png", // Masculine image
            description: "Fato safari com um toque urbano, combinando o clássico com a modernidade. Confortável e estiloso para o dia a dia.",
            features: ["Tecido leve e respirável", "Bolsos utilitários discretos", "Corte contemporâneo", "Ideal para o clima africano"],
            composition: "60% Algodão / 40% Linho"
        },

        // --- Conjuntos Profissionais Masculinos (6 Itens: Modelos 031-036) ---
        {
            id: 31,
            model: "MOD-M-031",
            title: "Conjunto Engenheiro/Construção",
            profession: "Engenheiro / Arquiteto / Construção",
            category: "conjunto",
            price: "75.000,00 AOA Kz",
            image: "img/conjuntos_masculino/engineer_set_m.png", // Masculine image
            description: "Conjunto de camisa de trabalho e calça robusta, ideal para engenheiros e profissionais da construção civil. Resistente e confortável.",
            features: ["Tecido reforçado com alta durabilidade", "Bolsos múltiplos para ferramentas e documentos", "Detalhes refletivos para segurança", "Corte que permite mobilidade"],
            composition: "60% Algodão / 40% Poliéster Workwear"
        },
        {
            id: 32,
            model: "MOD-M-032",
            title: "Conjunto Segurança Privada",
            profession: "Segurança / Vigilante",
            category: "conjunto",
            price: "68.000,00 AOA Kz",
            image: "img/conjuntos_masculino/security_set_m.png", // Masculine image
            description: "Uniforme completo para profissionais de segurança, composto por camisa, calça e cinto. Profissionalismo e autoridade.",
            features: ["Tecido resistente e de fácil manutenção", "Design clássico de segurança", "Costuras reforçadas para durabilidade", "Conforto para longas horas de patrulha"],
            composition: "100% Poliéster Tático"
        },
        {
            id: 33,
            model: "MOD-M-033",
            title: "Conjunto Profissional de Cozinha Masculino",
            profession: "Chef de Cozinha / Cozinheiro",
            category: "conjunto",
            price: "92.000,00 AOA Kz",
            image: "img/conjuntos_masculino/kitchen_pro_set_m.png", // Masculine image
            description: "Conjunto de dólmã e calça de chef, desenhado para o ambiente de alta gastronomia. Máximo conforto e higiene.",
            features: ["Dólmã de algodão egípcio respirável", "Calça com elástico e cordão para ajuste", "Bolso para termómetro na manga", "Fácil de lavar e desinfetar"],
            composition: "100% Algodão Pima (Dólmã), 65% Poliéster / 35% Algodão (Calça)"
        },
        {
            id: 34,
            model: "MOD-M-034",
            title: "Conjunto Atendente/Recepcionista Masculino",
            profession: "Recepcionista / Atendente",
            category: "conjunto",
            price: "80.000,00 AOA Kz",
            image: "img/conjuntos_masculino/reception_set_m.png", // Masculine image
            description: "Conjunto elegante de camisa social e calça de sarja, ideal para o atendimento ao público. Transmite profissionalismo e confiança.",
            features: ["Camisa de algodão/poliéster fácil de passar", "Calça de corte reto confortável", "Design clássico e versátil", "Ideal para hotéis, clínicas, escritórios"],
            composition: "60% Algodão / 40% Poliéster (Camisa), 100% Sarja (Calça)"
        },
        {
            id: 35,
            model: "MOD-M-035",
            title: "Conjunto Motorista Profissional",
            profession: "Motorista / Chauffeur",
            category: "conjunto",
            price: "88.000,00 AOA Kz",
            image: "img/conjuntos_masculino/driver_set_m.png", // Masculine image
            description: "Uniforme completo para motoristas, oferecendo conforto e uma aparência impecável. Inclui camisa, calça e colete.",
            features: ["Tecido resistente a amassados", "Corte que permite mobilidade ao dirigir", "Bolsos discretos para pequenos itens", "Design formal e elegante"],
            composition: "70% Poliéster / 30% Viscose"
        },
        {
            id: 36,
            model: "MOD-M-036",
            title: "Conjunto Desportivo Profissional Masculino",
            profession: "Personal Trainer / Educador Físico",
            category: "conjunto",
            price: "65.000,00 AOA Kz",
            image: "img/conjuntos_masculino/sport_pro_set_m.png", // Masculine image
            description: "Conjunto de fato de treino (calça e casaco) e T-shirt técnica, para profissionais do desporto. Conforto e performance.",
            features: ["Tecido com tecnologia dry-fit", "Liberdade de movimento", "Design moderno e atlético", "Ideal para treinos e instrução"],
            composition: "100% Poliéster (Fato de Treino), 90% Poliéster / 10% Elastano (T-shirt)"
        }
    ];

    // --- Gerenciamento de Elementos do DOM (Atualizado para novas classes) ---
    const catalogContainer = document.getElementById('catalog');
    const filterButtons = document.querySelectorAll('.filter-option'); // Alterado para '.filter-option'
    const productModal = document.getElementById('productModal'); // Permanece 'productModal'
    const modalImage = document.getElementById('modalImage'); // Permanece 'modalImage'
    const modalModel = document.getElementById('modalModel'); // Permanece 'modalModel'
    const modalPrice = document.getElementById('modalPrice'); // Permanece 'modalPrice'
    const closeModalButton = document.getElementById('closeModal'); // Permanece 'closeModal'
    const menuToggle = document.getElementById('menuToggle'); // Permanece 'menuToggle'
    const categoryFilter = document.getElementById('categoryFilter'); // Permanece 'categoryFilter'
    const closeMenuButton = document.getElementById('closeMenu'); // Permanece 'closeMenu'

    /**
     * Gera e exibe os cards dos produtos no catálogo, aplicando filtros.
     * @param {string} filter - A categoria para filtrar os produtos ('all' para todos).
     */
    function generateProductCards(filter = 'all') {
        catalogContainer.innerHTML = ''; // Limpa o conteúdo atual do container do catálogo
        
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(product => product.category === filter);
        
        if (filteredProducts.length === 0) {
            catalogContainer.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: var(--accent-white);">Nenhum produto encontrado nesta categoria.</p>'; // Cor ajustada
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card-new'; // Nova classe CSS
            productCard.innerHTML = `
                <div class="product-badge-new">${product.model}</div> <img src="${product.image}" alt="${product.title}" class="product-image-new"> <div class="product-info-new"> <div class="product-model-new">${product.model}</div> <div class="product-price-new">${product.price}</div> </div>
            `;
            
            productCard.addEventListener('click', () => openProductModal(product));
            
            catalogContainer.appendChild(productCard);
        });
    }

    /**
     * Abre o modal de detalhes do produto e preenche com as informações do produto selecionado.
     * No modal, apenas o modelo e o preço são exibidos, conforme solicitado.
     * @param {object} product - O objeto do produto a ser exibido no modal.
     */
    function openProductModal(product) {
        modalImage.src = product.image;
        modalImage.alt = product.title;
        modalModel.textContent = product.model;
        modalPrice.textContent = product.price;
        
        productModal.classList.add('active');
        document.body.classList.add('modal-open'); // Adiciona classe ao body para evitar o scroll
    }

    /**
     * Fecha o modal de detalhes do produto.
     */
    function closeProductModal() {
        productModal.classList.remove('active');
        document.body.classList.remove('modal-open'); // Remove classe do body para reativar o scroll
    }

    // --- Event Listeners ---

    // Evento de clique para os botões de filtro de categoria
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active')); // Remove 'active' de todos
            button.classList.add('active'); // Adiciona 'active' ao clicado
            const category = button.getAttribute('data-category');
            generateProductCards(category); // Gera os cards filtrados
            
            // Fecha o menu mobile após a seleção de uma categoria (se estiver aberto)
            categoryFilter.classList.remove('active');
            // Reabilita o scroll do body se o modal de produto NÃO estiver aberto (previne scroll lock duplo)
            if (!productModal.classList.contains('active')) {
                document.body.classList.remove('modal-open');
            }
        });
    });

    // Evento para fechar o modal ao clicar no botão 'x'
    closeModalButton.addEventListener('click', closeProductModal);
    
    // Evento para fechar o modal ao clicar fora do conteúdo do modal (overlay)
    productModal.addEventListener('click', function(e) {
        if (e.target === this) { // Verifica se o clique foi diretamente no overlay do modal
            closeProductModal();
        }
    });
    
    // Evento para fechar o modal com a tecla 'ESC'
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && productModal.classList.contains('active')) {
            closeProductModal();
        }
    });

    // Evento para alternar a visibilidade do menu mobile (abrir)
    menuToggle.addEventListener('click', () => {
        categoryFilter.classList.add('active');
        document.body.classList.add('modal-open'); // Impede o scroll do body quando o menu está aberto
    });

    // Evento para fechar o menu mobile
    closeMenuButton.addEventListener('click', () => {
        categoryFilter.classList.remove('active');
        document.body.classList.remove('modal-open'); // Reabilita o scroll do body
    });

    // --- Inicialização ---
    // Gera os cards dos produtos na carga inicial da página (mostra todos)
    generateProductCards();
});