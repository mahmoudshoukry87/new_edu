document.addEventListener('DOMContentLoaded', function() {
    const instructorsSwiper = new Swiper('.instructors-slider', {
        // Slides per view
        slidesPerView: 1,
        spaceBetween: 30,
        
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 480px
            480: {
                slidesPerView: 2,
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 3,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 4,
            }
        },

        // Auto play
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },

        // Loop
        loop: true,

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

        // Smooth transitions
        speed: 800,
        
        // Enable touch/mouse drag
        grabCursor: true,
        
        // Improved touch sensitivity
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
    });
});

// Array of instructor data - you can expand this with more instructors
const instructors = [
    {
        name: "John Smith",
        specialty: "Web Development",
        rating: 4.9,
        students: "12.5K",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        name: "Sarah Johnson",
        specialty: "UI/UX Design",
        rating: 4.8,
        students: "8.3K",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    // Add 10 more instructor objects here
];

// Function to create instructor cards dynamically
function createInstructorCards() {
    const wrapper = document.querySelector('.instructors-slider .swiper-wrapper');
    
    instructors.forEach(instructor => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        slide.innerHTML = `
            <div class="instructor-card">
                <div class="instructor-img">
                    <img src="${instructor.image}" alt="${instructor.name}">
                </div>
                <div class="instructor-info">
                    <h3>${instructor.name}</h3>
                    <p class="specialty">${instructor.specialty}</p>
                    <div class="stats">
                        <span><i class="fas fa-star"></i> ${instructor.rating}</span>
                        <span><i class="fas fa-user-graduate"></i> ${instructor.students}</span>
                    </div>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
        `;
        
        wrapper.appendChild(slide);
    });
}