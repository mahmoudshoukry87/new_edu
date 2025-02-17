document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.hero-slider', {
        // Effect
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },

        // Auto play
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        // Loop
        loop: true,

        // Transition speed
        speed: 1000,

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // تعطيل خاصية mousewheel
        mousewheel: false,

        // Keyboard Control
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        // تحسين التحكم باللمس
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,

        // منع تداخل السكرول
        nested: true,
        stopOnLastSlide: false,
        
        // تحسين الأداء
        preloadImages: false,
        lazy: true,
        
        // تحسين التفاعل
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
    });
});