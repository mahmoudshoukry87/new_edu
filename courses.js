document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const coursesSwiper = new Swiper('.courses-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // Responsive breakpoints
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            968: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 30,
            }
        }
    });

    // Handle course card clicks
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const link = this.querySelector('.course-link');
            if (link && !e.target.closest('.price-row')) {
                window.location.href = link.href;
            }
        });
    });
});