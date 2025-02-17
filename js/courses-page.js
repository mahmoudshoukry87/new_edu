document.addEventListener('DOMContentLoaded', function() {
    // Current User Data
    const currentUser = {
        login: 'mahmoudshoukry87',
        lastVisit: '2025-02-16 12:01:56'
    };

    // Constants
    const ITEMS_PER_PAGE = 24;
    let currentPage = 1;

    // Get DOM Elements
    const coursesGrid = document.querySelector('.courses-grid');
    const paginationContainer = document.querySelector('.pagination');
    const prevPageBtn = document.querySelector('.prev-page');
    const nextPageBtn = document.querySelector('.next-page');
    const pageNumbers = document.querySelector('.page-numbers');

    // Course Data Structure
    const courses = Array.from(document.querySelectorAll('.course-card'));
    const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);

    // Initialize Course View
    function initializeView() {
        updateCoursesCount();
        updatePagination();
        showPage(currentPage);
        initializeFilters();
        initializeSearch();
    }

    // Update Courses Count
    function updateCoursesCount() {
        const countElement = document.querySelector('.courses-count');
        if (countElement) {
            countElement.textContent = `${courses.length} courses available`;
        }
    }

    // Pagination Functions
    function showPage(pageNum) {
        courses.forEach((course, index) => {
            const start = (pageNum - 1) * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;
            course.style.display = (index >= start && index < end) ? 'block' : 'none';
        });
        currentPage = pageNum;
        updatePaginationButtons();
    }

    function updatePagination() {
        // Clear existing page numbers
        pageNumbers.innerHTML = '';

        // Add page numbers
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            if (i === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => showPage(i));
            pageNumbers.appendChild(button);
        }

        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;

        // Update active state of page numbers
        document.querySelectorAll('.page-numbers button').forEach((button, index) => {
            button.classList.toggle('active', index + 1 === currentPage);
        });
    }

    // Course Card Interactions
    function initializeCourseCards() {
        courses.forEach(card => {
            // Add hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });

            // Add click handler
            card.addEventListener('click', function() {
                const courseTitle = this.querySelector('h3').textContent;
                const coursePrice = this.querySelector('.price').textContent;
                console.log(`Selected course: ${courseTitle} - ${coursePrice}`);
                // Here you can add navigation to course detail page
            });
        });
    }

    // Search Functionality
    function initializeSearch() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search courses...';
        searchInput.classList.add('course-search');
        
        document.querySelector('.courses-header').appendChild(searchInput);

        let searchTimeout;
        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase();
                filterCourses(searchTerm);
            }, 300);
        });
    }

    function filterCourses(searchTerm) {
        courses.forEach(course => {
            const title = course.querySelector('h3').textContent.toLowerCase();
            const instructor = course.querySelector('.instructor span').textContent.toLowerCase();
            const category = course.querySelector('.category').textContent.toLowerCase();
            
            const isVisible = 
                title.includes(searchTerm) || 
                instructor.includes(searchTerm) || 
                category.includes(searchTerm);
            
            course.style.display = isVisible ? 'block' : 'none';
        });
    }

    // Loading Animation
    function showLoadingState() {
        coursesGrid.classList.add('loading');
    }

    function hideLoadingState() {
        coursesGrid.classList.remove('loading');
    }

    // Event Listeners
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });

    // Price Formatting
    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }

    // Rating Display
    function updateRatingDisplay(ratingElement, rating, totalRatings) {
        const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
        ratingElement.innerHTML = `
            <span class="stars">${stars}</span>
            <span class="rating-number">${rating.toFixed(1)}</span>
            <span class="total-ratings">(${totalRatings.toLocaleString()})</span>
        `;
    }

    // Course Time Remaining
    function updateTimeRemaining() {
        const timeElements = document.querySelectorAll('.course-time-remaining');
        timeElements.forEach(element => {
            const endDate = new Date(element.dataset.endDate);
            const now = new Date();
            const timeLeft = endDate - now;

            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                element.textContent = `${days} days left`;
            } else {
                element.textContent = 'Expired';
            }
        });
    }

    // Initialize Everything
    function init() {
        initializeView();
        initializeCourseCards();
        setInterval(updateTimeRemaining, 60000); // Update time every minute
    }

    // Start the application
    init();

    // Error Handling
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.error);
        hideLoadingState();
        // You could show an error message to the user here
    });
});


