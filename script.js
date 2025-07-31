document.addEventListener('DOMContentLoaded', function() {
    // Efeito hover nos cards
    const catalogCards = document.querySelectorAll('.catalog-card');
    
    catalogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.link-arrow').innerHTML = '<i class="fas fa-arrow-right"></i>';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.link-arrow').innerHTML = '<i class="fas fa-chevron-right"></i>';
        });
    });
});