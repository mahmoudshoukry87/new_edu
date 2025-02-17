document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe statistics section
    const statsSection = document.querySelector('.statistics-section');
    observer.observe(statsSection);

    // Counter animation function
    function startCounting() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.innerText.replace(/,/g, ''));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.round(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };

            updateCounter();
        });
    }
});