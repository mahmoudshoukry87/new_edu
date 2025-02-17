document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    
    // للموبايل فقط - نقل الأزرار داخل القائمة
    if (window.innerWidth <= 968) {
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons && !navMenu.querySelector('.auth-buttons')) {
            navMenu.appendChild(authButtons);
        }
    }

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        const authButtons = document.querySelector('.auth-buttons');
        
        if (window.innerWidth > 968) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            
            // إعادة الأزرار إلى مكانها الأصلي
            if (authButtons && navMenu.contains(authButtons)) {
                header.querySelector('.container').appendChild(authButtons);
            }
        } else {
            // نقل الأزرار داخل القائمة للموبايل
            if (authButtons && !navMenu.contains(authButtons)) {
                navMenu.appendChild(authButtons);
            }
        }
    });

    // Add scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });
});