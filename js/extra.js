document.addEventListener('DOMContentLoaded', function() {
    // Initialize all sliders
    initSlider('pending-slider');
    initSlider('ongoing-slider');
    initSlider('completed-slider');
    
    // Handle tab navigation
    const tabLinks = document.querySelectorAll('a[data-toggle="tab"]');
    tabLinks.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(e) {
            // Reset all sliders when switching tabs
            const targetId = e.target.getAttribute('href').substring(1);
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                const slider = targetPane.querySelector('.arch-slider');
                if (slider) {
                    resetSlider(slider.id);
                }
            }
        });
    });
    
    function initSlider(sliderId) {
        const slider = document.getElementById(sliderId);
        if (!slider) return;
        
        const slides = slider.querySelectorAll('.arch-slide');
        const indicators = slider.parentElement.querySelectorAll('.arch-indicator');
        let currentSlide = 0;
        let slideInterval;
        let isMultiItem = window.innerWidth >= 992;
        let visibleSlides = isMultiItem ? 3 : (window.innerWidth >= 768 ? 2 : 1);
        
        // Set initial position
        updateSliderPosition();
        
        // Start automatic rotation
        startAutoRotation();
        
        // Add event listeners to indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateSliderPosition();
                updateIndicators();
                resetAutoRotation();
            });
        });
        
        // Pause rotation on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // Resume rotation on mouse leave
        slider.addEventListener('mouseleave', () => {
            startAutoRotation();
        });
        
        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next slide
                goToNextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous slide
                goToPrevSlide();
            }
        }
        
        function goToNextSlide() {
            currentSlide = (currentSlide + 1) % (slides.length - visibleSlides + 1);
            updateSliderPosition();
            updateIndicators();
            resetAutoRotation();
        }
        
        function goToPrevSlide() {
            currentSlide = (currentSlide - 1 + (slides.length - visibleSlides + 1)) % (slides.length - visibleSlides + 1);
            updateSliderPosition();
            updateIndicators();
            resetAutoRotation();
        }
        
        function updateSliderPosition() {
            const slideWidth = 100 / visibleSlides;
            const offset = -currentSlide * slideWidth;
            slider.style.transform = `translateX(${offset}%)`;
        }
        
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        function startAutoRotation() {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % (slides.length - visibleSlides + 1);
                updateSliderPosition();
                updateIndicators();
            }, 5000); // Change slide every 5 seconds
        }
        
        function resetAutoRotation() {
            clearInterval(slideInterval);
            startAutoRotation();
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const wasMultiItem = isMultiItem;
            isMultiItem = window.innerWidth >= 992;
            const newVisibleSlides = isMultiItem ? 3 : (window.innerWidth >= 768 ? 2 : 1);
            
            if (newVisibleSlides !== visibleSlides) {
                visibleSlides = newVisibleSlides;
                // Adjust current slide if needed
                if (currentSlide > slides.length - visibleSlides) {
                    currentSlide = slides.length - visibleSlides;
                }
                updateSliderPosition();
            }
        });
    }
    
    function resetSlider(sliderId) {
        const slider = document.getElementById(sliderId);
        if (!slider) return;
        
        slider.style.transform = 'translateX(0)';
        
        const indicators = slider.parentElement.querySelectorAll('.arch-indicator');
        indicators.forEach((indicator, index) => {
            if (index === 0) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
});