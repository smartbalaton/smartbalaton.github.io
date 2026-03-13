document.addEventListener('DOMContentLoaded', function() {

 // --- UPDATED ---
    // 1. Set the total number of images you have.
    const totalImages = 59; 
    
    // 2. Define the naming pattern and folder.
    const filePrefix = 'balaton_';
    const fileExtension = '.jpg';
    const imageFolder = 'gallery/';

    // 3. The array is now built dynamically.
    const fullImageNames = [];
    for (let i = 1; i <= totalImages; i++) {
        // Pad the number to three digits (e.g., 1 -> "001", 12 -> "012", 120 -> "120")
        const imageNumber = i.toString().padStart(3, '0');
        const imageName = `${filePrefix}${imageNumber}${fileExtension}`; // e.g., "balaton_001.jpg"
        fullImageNames.push(imageName);
    }
    // --- END OF UPDATES ---


    const galleryContainer = document.getElementById('gallery-container');
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentImageIndex;

    // Populate the gallery
    fullImageNames.forEach((imageName, index) => {
        const thumbSrc = imageFolder + 'tn_' + imageName; // Creates path like 'gallery/tn_image1.jpg'
        
        const img = document.createElement('img');
        img.src = thumbSrc;
        img.dataset.index = index;
        img.alt = imageName; // Good for accessibility
        galleryContainer.appendChild(img);
    });

    // Function to open the modal
    function openModal(index) {
        currentImageIndex = parseInt(index);
        const fullImageSrc = imageFolder + fullImageNames[currentImageIndex]; // Creates path like 'gallery/image1.jpg'
        modal.style.display = 'block';
        modalImg.src = fullImageSrc;
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Function to show the next or previous image
    function changeImage(direction) {
        currentImageIndex += direction;
        if (currentImageIndex >= fullImageNames.length) {
            currentImageIndex = 0;
        }
        if (currentImageIndex < 0) {
            currentImageIndex = fullImageNames.length - 1;
        }
        const fullImageSrc = imageFolder + fullImageNames[currentImageIndex];
        modalImg.src = fullImageSrc;
    }

    // Event Listeners (no changes here)
    galleryContainer.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            openModal(e.target.dataset.index);
        }
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    prevBtn.addEventListener('click', () => changeImage(-1));
    nextBtn.addEventListener('click', () => changeImage(1));

    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'ArrowRight') changeImage(1);
            if (e.key === 'Escape') closeModal();
        }
    });
});