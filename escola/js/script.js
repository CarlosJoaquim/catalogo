document.addEventListener('DOMContentLoaded', function() {
    // --- Image Data for Galleries (UPDATED PATHS) ---
    const galleryImages = {
        uniforme: [
            'img/uniforme_escolar/uni1.png',
            'img/uniforme_escolar/uni2.png',
            'img/uniforme_escolar/uni3.png',
            'img/uniforme_escolar/uni4.png',
            // Add more images to this array if needed
        ],
        educacao_fisica: [ // Mapped from 'educacao-fisica' section ID
            'img/educacao_fisica/edu1.png', // Assuming you'll have actual images here
            'img/educacao_fisica/edu2.png',
            'img/educacao_fisica/edu3.png',
            'img/educacao_fisica/edu4.png',
            // 'https://via.placeholder.com/800x500/000/fff?text=Educação+Física+1',
            // 'https://via.placeholder.com/800x500/fff/000?text=Educação+Física+2',
            // 'https://via.placeholder.com/800x500/000/fff?text=Educação+Física+3',
        ],
        bordados: [
            'img/bordados_escolar/borda1.png', // Assuming you'll have actual images here
            'img/bordados_escolar/borda2.png',
            'img/bordados_escolar/borda3.png',
            'img/bordados_escolar/borda4.png',
            // 'https://via.placeholder.com/800x500/fff/000?text=Bordados+1',
            // 'https://via.placeholder.com/800x500/000/fff?text=Bordados+2',
            // 'https://via.placeholder.com/800x500/fff/000?text=Bordados+3',
        ]
    };

    // --- DOM Elements ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link'); // Changed to .nav-link
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.card'); // Cards on the "Início" section
    const imageModal = document.querySelector('.image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close-modal');

    // --- Helper Functions ---

    /**
     * Initializes a gallery section with its main image, thumbnails, and navigation controls.
     * @param {HTMLElement} galleryContainer - The main container for a specific gallery.
     * @param {Array<string>} images - An array of image URLs for this gallery.
     */
    function initializeGallery(galleryContainer, images) {
        const mainImageElement = galleryContainer.querySelector('.gallery-main-img'); // Use class for main image
        const thumbnailsContainer = galleryContainer.querySelector('.gallery-thumbnails');
        const prevBtn = galleryContainer.querySelector('.prev-btn');
        const nextBtn = galleryContainer.querySelector('.next-btn');
        const zoomBtn = galleryContainer.querySelector('.zoom-btn');

        // Basic check for required elements
        if (!mainImageElement || !thumbnailsContainer || !prevBtn || !nextBtn || !zoomBtn || !images || images.length === 0) {
            console.warn('Gallery elements or image data missing for:', galleryContainer.dataset.galleryId, '. Skipping initialization.');
            // Set placeholder if no images
            if (mainImageElement) {
                mainImageElement.src = 'https://via.placeholder.com/800x500/CCCCCC/888888?text=Sem+Imagens';
            }
            // Hide controls if no images or not enough images for navigation
            if (images && images.length <= 1) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            }
            return;
        }

        let currentImageIndex = 0;

        // Set initial main image
        mainImageElement.src = images[0];
        mainImageElement.alt = `Imagem principal de ${galleryContainer.dataset.galleryId}`;

        // Populate thumbnails
        thumbnailsContainer.innerHTML = ''; // Clear existing thumbnails
        images.forEach((imageUrl, index) => {
            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.classList.add('thumbnail');
            thumbnailDiv.dataset.image = imageUrl;
            if (index === 0) {
                thumbnailDiv.classList.add('active');
            }
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `Miniatura ${index + 1} de ${galleryContainer.dataset.galleryId}`;
            thumbnailDiv.appendChild(img);

            thumbnailDiv.addEventListener('click', function() {
                updateGallery(index);
            });
            thumbnailsContainer.appendChild(thumbnailDiv);
        });

        // Update gallery display function
        function updateGallery(index) {
            currentImageIndex = index;
            mainImageElement.src = images[currentImageIndex];
            
            thumbnailsContainer.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            if (thumbnailsContainer.children[currentImageIndex]) { // Ensure element exists
                 thumbnailsContainer.children[currentImageIndex].classList.add('active');
                 // Optional: Scroll thumbnail into view if many
                 thumbnailsContainer.children[currentImageIndex].scrollIntoView({
                     behavior: 'smooth',
                     block: 'nearest'
                 });
            }
        }

        // Navigation buttons
        prevBtn.addEventListener('click', function() {
            let newIndex = currentImageIndex - 1;
            if (newIndex < 0) {
                newIndex = images.length - 1; // Loop to last image
            }
            updateGallery(newIndex);
        });

        nextBtn.addEventListener('click', function() {
            let newIndex = currentImageIndex + 1;
            if (newIndex >= images.length) {
                newIndex = 0; // Loop to first image
            }
            updateGallery(newIndex);
        });

        // Zoom button
        zoomBtn.addEventListener('click', function() {
            modalImage.src = mainImageElement.src;
            imageModal.classList.add('active');
            document.body.classList.add('modal-open'); // Prevent body scroll
        });

        // Hide controls if only one image
        if (images.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }

    // --- Event Listeners ---

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('modal-open'); // Toggle body scroll lock
        });
    }

    // Navigation Links (Desktop and Mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                document.body.classList.remove('modal-open'); // Re-enable body scroll
            }
            
            // Deactivate all nav links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Activate clicked link
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            } else {
                console.warn(`Section with ID '${sectionId}' not found.`);
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });

    // Cards on "Início" section (navigate to specific sections)
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-target-section'); // Using data-target-section from HTML
            
            // Trigger click on the corresponding nav link
            const targetNavLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
            if (targetNavLink) {
                targetNavLink.click(); // This handles section visibility and active link state
            } else {
                console.warn(`Nav link for section '${sectionId}' not found.`);
            }
        });
    });

    // Image Modal Close
    if (closeModal && imageModal && modalImage) {
        closeModal.addEventListener('click', function() {
            imageModal.classList.remove('active');
            document.body.classList.remove('modal-open'); // Re-enable body scroll
        });

        // Close modal when clicking outside the image
        imageModal.addEventListener('click', function(e) {
            if (e.target === this) { // Check if click was directly on the modal backdrop
                imageModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });

        // Close modal with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && imageModal.classList.contains('active')) {
                imageModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    } else {
        console.error("One or more modal elements are missing. Check your HTML for '.image-modal', '#modal-image', '.close-modal'.");
    }

    // --- Initialization ---
    // Initialize each gallery found in the document
    const allGalleryContainers = document.querySelectorAll('.gallery-container');
    allGalleryContainers.forEach(container => {
        const galleryId = container.dataset.galleryId;
        if (galleryImages[galleryId]) {
            initializeGallery(container, galleryImages[galleryId]);
        } else {
            console.error(`No image data found for gallery ID: ${galleryId}. Please check galleryImages object.`);
        }
    });

    // Ensure initial active section is shown and nav link is active
    // This is handled by default by the 'active' class on 'inicio' section and desktop-nav link
    // No specific JS needed unless you want to override initial state.
});