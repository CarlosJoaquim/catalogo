document.addEventListener('DOMContentLoaded', function() {
    // --- Image Data for Galleries ---
    const galleryImages = {
        toalhas: [
            'img/toalhas/toalha1.png',
            'img/toalhas/toalha2.png',
            'img/toalhas/toalha3.png',
            // Add more toalhas images here
        ],
        aventais: [
            'img/aventais/aventais1.png',
            'img/aventais/aventais2.png',
            'img/aventais/aventais3.png',
            // Add more aventais images here
        ],
        uniformes: [
            'img/uniformes/uniformes1.png',
            'img/uniformes/uniformes2.png',
            'img/uniformes/uniformes3.png',
            'img/uniformes/uniformes4.png',
            'img/uniformes/uniformes5.png',
            // Add more uniformes images here
        ]
    };

    // --- DOM Elements ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link'); // Changed to .nav-link for consistency
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
        const mainImageElement = galleryContainer.querySelector('.gallery-main-img');
        const thumbnailsContainer = galleryContainer.querySelector('.gallery-thumbnails');
        const prevBtn = galleryContainer.querySelector('.prev-btn');
        const nextBtn = galleryContainer.querySelector('.next-btn');
        const zoomBtn = galleryContainer.querySelector('.zoom-btn');

        if (!mainImageElement || !thumbnailsContainer || !prevBtn || !nextBtn || !zoomBtn || images.length === 0) {
            console.warn('Gallery elements or images missing for:', galleryContainer.dataset.galleryId);
            return;
        }

        let currentImageIndex = 0;

        // Set initial main image
        mainImageElement.src = images[0];
        mainImageElement.alt = `Imagem principal de ${galleryContainer.dataset.galleryId}`;

        // Populate thumbnails
        thumbnailsContainer.innerHTML = ''; // Clear existing
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

        // Update gallery display
        function updateGallery(index) {
            currentImageIndex = index;
            mainImageElement.src = images[currentImageIndex];
            
            thumbnailsContainer.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            thumbnailsContainer.children[currentImageIndex].classList.add('active');
            
            // Optional: Scroll thumbnail into view if many
            thumbnailsContainer.children[currentImageIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }

        // Navigation buttons
        prevBtn.addEventListener('click', function() {
            let newIndex = currentImageIndex - 1;
            if (newIndex < 0) {
                newIndex = images.length - 1; // Loop to end
            }
            updateGallery(newIndex);
        });

        nextBtn.addEventListener('click', function() {
            let newIndex = currentImageIndex + 1;
            if (newIndex >= images.length) {
                newIndex = 0; // Loop to start
            }
            updateGallery(newIndex);
        });

        // Zoom button
        zoomBtn.addEventListener('click', function() {
            modalImage.src = mainImageElement.src;
            imageModal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    }

    // --- Event Listeners ---

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('modal-open'); // Prevent body scroll
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
            const sectionId = this.getAttribute('data-target-section'); // Using data-target-section
            
            // Trigger click on the corresponding nav link
            const targetNavLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
            if (targetNavLink) {
                targetNavLink.click(); // This will handle section visibility and active link state
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
    // Initialize each gallery
    const allGalleryContainers = document.querySelectorAll('.gallery-container');
    allGalleryContainers.forEach(container => {
        const galleryId = container.dataset.galleryId;
        if (galleryImages[galleryId]) {
            initializeGallery(container, galleryImages[galleryId]);
        } else {
            console.error(`No image data found for gallery ID: ${galleryId}`);
        }
    });

    // Set initial active section (e.g., 'inicio')
    // This is handled by default by the 'active' class on 'inicio' section and desktop-nav link
    // If you want to force it, add: document.getElementById('inicio').classList.add('active');
});