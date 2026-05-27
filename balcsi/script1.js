document.addEventListener('DOMContentLoaded', function() {
    const galleries = {
        felujitas: {
            totalImages: 114,
            filePrefix: 'balaton_',
            fileExtension: '.jpg',
            imageFolder: 'gallery/',
            images: []
        },
        latvany: {
            totalImages: 18,
            filePrefix: 'latvany_',
            fileExtension: '.jpg',
            imageFolder: 'latvany/',
            images: []
        }
    };

    // Build image arrays
    Object.keys(galleries).forEach(galleryKey => {
        const gallery = galleries[galleryKey];
        gallery.images = [];
        for (let i = 1; i <= gallery.totalImages; i++) {
            const imageNumber = i.toString().padStart(3, '0');
            const imageName = `${gallery.filePrefix}${imageNumber}${gallery.fileExtension}`;
            gallery.images.push(imageName);
        }
        gallery.images.reverse();
    });

    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const tabButtons = document.querySelectorAll('.tab-button');

    let currentImageIndex;
    let currentGallery = 'felujitas';

    // Initialize galleries
    function initGallery(galleryKey) {
        const gallery = galleries[galleryKey];
        const containerId = `gallery-container-${galleryKey}`;
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        gallery.images.forEach((imageName, index) => {
            const thumbSrc = gallery.imageFolder + 'tn_' + imageName;
            const img = document.createElement('img');
            img.src = thumbSrc;
            img.dataset.index = index;
            img.dataset.gallery = galleryKey;
            img.alt = imageName;
            container.appendChild(img);
        });
    }

    // Initialize both galleries
    initGallery('felujitas');
    initGallery('latvany');

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabName).classList.add('active');

            currentGallery = tabName;
        });
    });

    // Gallery click handlers
    document.querySelectorAll('.gallery-container').forEach(container => {
        container.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG') {
                currentGallery = e.target.dataset.gallery;
                currentImageIndex = parseInt(e.target.dataset.index);
                openModal();
            }
        });
    });

    function openModal() {
        const gallery = galleries[currentGallery];
        const fullImageSrc = gallery.imageFolder + gallery.images[currentImageIndex];
        modal.style.display = 'block';
        modalImg.src = fullImageSrc;
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function changeImage(direction) {
        const gallery = galleries[currentGallery];
        currentImageIndex += direction;
        if (currentImageIndex >= gallery.images.length) {
            currentImageIndex = 0;
        }
        if (currentImageIndex < 0) {
            currentImageIndex = gallery.images.length - 1;
        }
        const fullImageSrc = gallery.imageFolder + gallery.images[currentImageIndex];
        modalImg.src = fullImageSrc;
    }

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