document.addEventListener('DOMContentLoaded', function() {
    // Filter State
    let activeFilters = {
        category: '',
        subCategory: '',
        instructors: [],
        sortBy: 'popular'
    };

    // Category Toggle and Selection
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        // Toggle sub-categories visibility
        item.addEventListener('click', function(e) {
            const subCategories = this.nextElementSibling;
            const icon = this.querySelector('i');
            const categoryName = this.querySelector('span').textContent;
            
            // Toggle sub-categories visibility
            subCategories.classList.toggle('active');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');

            // Set active category and apply filters
            activeFilters.category = categoryName;
            applyFilters();
        });
    });

    // Sub-category Selection
    document.querySelectorAll('.sub-categories li').forEach(subCategory => {
        subCategory.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            activeFilters.subCategory = this.textContent;
            applyFilters();
        });
    });

    // Instructor Checkboxes
    const instructorCheckboxes = document.querySelectorAll('.instructors-list input[type="checkbox"]');
    instructorCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const instructorName = this.parentElement.textContent.trim();
            if (this.checked) {
                activeFilters.instructors.push(instructorName);
            } else {
                activeFilters.instructors = activeFilters.instructors.filter(name => name !== instructorName);
            }
            applyFilters();
        });
    });

    // Sort Options
    const sortOptions = document.querySelectorAll('.sort-options li');
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            sortOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            activeFilters.sortBy = this.dataset.sort;
            applySorting();
        });
    });

    // Clear Filters
    const clearFiltersBtn = document.querySelector('.clear-filters');
    clearFiltersBtn.addEventListener('click', function() {
        // Reset filter state
        activeFilters = {
            category: '',
            subCategory: '',
            instructors: [],
            sortBy: 'popular'
        };

        // Reset UI
        instructorCheckboxes.forEach(checkbox => checkbox.checked = false);
        sortOptions.forEach(opt => opt.classList.remove('active'));
        document.querySelectorAll('.sub-categories').forEach(sub => sub.classList.remove('active'));
        document.querySelectorAll('.category-item i').forEach(icon => {
            icon.className = 'fas fa-chevron-down';
        });

        // Show all courses
        showAllCourses();
    });

    // Apply Filters Function
    function applyFilters() {
        const courses = document.querySelectorAll('.course-card');
        
        courses.forEach(course => {
            let shouldShow = true;

            // Category filter
            if (activeFilters.category) {
                const courseCategory = course.querySelector('.category').textContent.trim();
                if (courseCategory !== activeFilters.category) {
                    shouldShow = false;
                }
            }

            // Instructor filter
            if (shouldShow && activeFilters.instructors.length > 0) {
                const courseInstructor = course.querySelector('.instructor span').textContent.trim();
                if (!activeFilters.instructors.includes(courseInstructor)) {
                    shouldShow = false;
                }
            }

            // Apply visibility
            course.style.display = shouldShow ? 'block' : 'none';
        });

        // Update courses count
        updateCoursesCount();
    }

    // Apply Sorting Function
    function applySorting() {
        const coursesGrid = document.querySelector('.courses-grid');
        const courses = Array.from(coursesGrid.children);
        
        courses.sort((a, b) => {
            switch(activeFilters.sortBy) {
                case 'popular':
                    return getRating(b) - getRating(a);
                case 'newest':
                    return getDate(b) - getDate(a);
                case 'price-asc':
                    return getPrice(a) - getPrice(b);
                case 'price-desc':
                    return getPrice(b) - getPrice(a);
                default:
                    return 0;
            }
        });

        coursesGrid.innerHTML = '';
        courses.forEach(course => coursesGrid.appendChild(course));
    }

    // Helper Functions
    function getPrice(course) {
        const priceText = course.querySelector('.price').textContent;
        return parseFloat(priceText.replace('$', ''));
    }

    function getRating(course) {
        const ratingText = course.querySelector('.rating span').textContent;
        return parseFloat(ratingText.split(' ')[0]);
    }

    function getDate(course) {
        // Fallback to current date if no date is specified
        return new Date();
    }

    function showAllCourses() {
        document.querySelectorAll('.course-card').forEach(card => {
            card.style.display = 'block';
        });
        updateCoursesCount();
    }

    function updateCoursesCount() {
        const visibleCourses = document.querySelectorAll('.course-card[style="display: block"]').length;
        const coursesCount = document.querySelector('.courses-count');
        if (coursesCount) {
            coursesCount.textContent = `${visibleCourses} course${visibleCourses !== 1 ? 's' : ''} available`;
        }
    }

    // Mobile Filter Toggle
    const filterToggle = document.createElement('button');
    filterToggle.classList.add('filters-toggle');
    filterToggle.innerHTML = '<i class="fas fa-filter"></i>';
    document.querySelector('.courses-header').appendChild(filterToggle);

    filterToggle.addEventListener('click', function() {
        document.querySelector('.filters-sidebar').classList.toggle('active');
    });

    // Initialize
    showAllCourses();
});