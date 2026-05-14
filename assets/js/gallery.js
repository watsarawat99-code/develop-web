
        const gallery = document.getElementById('gallery');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
    
        const filterButtons = document.querySelectorAll('.filter-btn');
    
        let galleryData = [];
    
        let currentFilter = 'all';
    
        let visibleItems = 12;
        let currentImages = [];
        let currentIndex = 0;
    
        // =========================
        // LOAD JSON
        // =========================
    
        async function loadGallery() {
    
            try {
    
                const response = await fetch('./assets/data/gallery.json');
    
                galleryData = await response.json();
    
                renderGallery();
    
            } catch (error) {
    
                console.error(error);

                gallery.innerHTML = `
                    <div class="col-span-full text-center py-20">
            
                        <p class="text-gray-500 text-lg">
                            ไม่สามารถโหลดผลงานได้
                        </p>
            
                    </div>
                `;
    
            }
    
        }
    
        // =========================
        // RENDER
        // =========================
    
        function renderGallery() {

            gallery.innerHTML = '';
    
            let filteredData = currentFilter === 'all'
                ? galleryData
                : galleryData.filter(
                    item => item.category === currentFilter
                );
    
            const visibleData = filteredData.slice(0, visibleItems);

            currentImages = visibleData.filter(item => item.image);
    
            visibleData.forEach((item, index) => {
    
                gallery.innerHTML += `
    
                    <div class="gallery-item">
    
                        <div class="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl duration-300">
    
                            <div class="relative overflow-hidden rounded-3xl group cursor-pointer">
    
                                <img
    src="${item.image}"
    data-image="${item.image}"
                                data-index="${index}"
                                    class="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                    onerror="
    currentImages = currentImages.filter(
        img => img.image !== this.dataset.image
    );
    this.closest('.gallery-item').remove();
"
                                >
                                
                                <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 duration-300 flex items-center justify-center pointer-events-none">
    
                                    <span class="pointer-events-none bg-white text-black px-4 py-2 rounded-full text-sm font-medium">
                                        ดูรูป
                                    </span>
    
                                </div>
    
                            </div>
    
                        </div>
    
                    </div>
    
                `;
    
            });
    
            // HIDE BUTTON
    
            if (visibleItems >= filteredData.length) {
    
                loadMoreBtn.style.display = 'none';
    
            } else {
    
                loadMoreBtn.style.display = 'inline-flex';
    
            }
    
        }
    
        // =========================
        // FILTER
        // =========================
    
        filterButtons.forEach(button => {
    
            button.addEventListener('click', () => {
    
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
    
                button.classList.add('active');
    
                currentFilter = button.dataset.filter;
    
                visibleItems = 12;
    
                renderGallery();
    
            });
    
        });
    
        // =========================
        // LOAD MORE
        // =========================
    
        loadMoreBtn.addEventListener('click', () => {
    
            visibleItems += 12;
    
            renderGallery();
    
        });
    
        // =========================
        // START
        // =========================
    
        loadGallery();
        
        // =========================
        // IMAGE MODAL
        // =========================
        
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const closeModal = document.getElementById('closeModal');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        prevBtn.addEventListener('click', () => {

            showImage(currentIndex - 1);
        
        });
        
        nextBtn.addEventListener('click', () => {
        
            showImage(currentIndex + 1);
        
        });
        gallery.addEventListener('click', (e) => {

            const image = e.target;
        
            if (image.tagName !== 'IMG') return;
        
            currentIndex = Number(image.dataset.index);
        
            modalImage.src = currentImages[currentIndex].image;
        
            modal.classList.remove('hidden');

            requestAnimationFrame(() => {
                modal.classList.add('flex');
            });
            document.body.style.overflow = 'hidden';
        });
        
        
        
        
        // CLOSE BUTTON
        
        closeModal.addEventListener('click', () => {
        
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        
        });
        
        // CLICK BACKDROP
        
        modal.addEventListener('click', (e) => {
        
            if (e.target === modal) {
        
                modal.classList.add('hidden');
                modal.classList.remove('flex');
        
            }
        
        });
        
        //ฟั่งชั่นเลื่อน ซ้ายขวา
        function showImage(index) {

            if (index < 0) {
                index = currentImages.length - 1;
            }
        
            if (index >= currentImages.length) {
                index = 0;
            }
        
            currentIndex = index;
        
            modalImage.src = currentImages[currentIndex].image;
        
        }
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        modal.addEventListener('touchstart', (e) => {
        
            touchStartX = e.changedTouches[0].screenX;
        
        });
        
        modal.addEventListener('touchend', (e) => {
        
            touchEndX = e.changedTouches[0].screenX;
        
            handleSwipe();
        
        });
        
        function handleSwipe() {
        
            const diff = touchStartX - touchEndX;
        
            // swipe left
            if (diff > 50) {
        
                showImage(currentIndex + 1);
        
            }
        
            // swipe right
            if (diff < -50) {
        
                showImage(currentIndex - 1);
        
            }
        
        }
    