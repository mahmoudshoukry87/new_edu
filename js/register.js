document.addEventListener('DOMContentLoaded', function() {
    // Categories Data
    const categories = {
        development: ['Web Development', 'Mobile Development', 'Game Development', 'Software Engineering'],
        design: ['UI/UX Design', 'Graphic Design', 'Motion Graphics', '3D Design'],
        business: ['Marketing', 'Finance', 'Entrepreneurship', 'Management'],
        marketing: ['Digital Marketing', 'Social Media', 'Content Marketing', 'SEO']
    };

    // Elements
    const form = document.getElementById('registerForm');
    const accountTypeBtns = document.querySelectorAll('.switch-btn');
    const studentFields = document.getElementById('studentFields');
    const instructorFields = document.getElementById('instructorFields');
    const mainCategorySelect = document.querySelector('select[name="mainCategory"]');
    const subCategorySelect = document.querySelector('select[name="subCategory"]');
    const accountTypeInput = document.querySelector('input[name="accountType"]');
    
    // Switch between account types
    accountTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const accountType = this.getAttribute('data-type');
            
            // Update buttons
            accountTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update hidden input
            accountTypeInput.value = accountType;
            
            // Show/hide appropriate fields
            if (accountType === 'student') {
                studentFields.style.display = 'block';
                instructorFields.style.display = 'none';
            } else {
                studentFields.style.display = 'none';
                instructorFields.style.display = 'block';
            }

            // Reset form validation states
            resetFormValidation();
        });
    });

    // Update sub-categories when main category changes
    mainCategorySelect?.addEventListener('change', function() {
        const selectedCategory = this.value;
        subCategorySelect.innerHTML = '<option value="">Select Sub Category</option>';
        
        if (selectedCategory && categories[selectedCategory]) {
            categories[selectedCategory].forEach(subCategory => {
                const option = document.createElement('option');
                option.value = subCategory.toLowerCase().replace(/ /g, '-');
                option.textContent = subCategory;
                subCategorySelect.appendChild(option);
            });
            subCategorySelect.disabled = false;
        } else {
            subCategorySelect.disabled = true;
        }
    });

    // Handle file upload
    const fileInput = document.querySelector('input[type="file"]');
    const fileName = document.querySelector('.file-name');
    
    fileInput?.addEventListener('change', function() {
        if (this.files[0]) {
            const file = this.files[0];
            // Check file type
            if (file.type !== 'application/pdf') {
                showError(this, 'Please upload a PDF file');
                this.value = '';
                fileName.textContent = '';
                return;
            }
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showError(this, 'File size should be less than 5MB');
                this.value = '';
                fileName.textContent = '';
                return;
            }
            fileName.textContent = file.name;
            hideError(this);
        } else {
            fileName.textContent = '';
        }
    });

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Validate phone number
    function validatePhone(phone) {
        // Basic phone validation (can be customized based on your requirements)
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    }

    // Validate email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate password
    function validatePassword(password) {
        // Password must be at least 8 characters long and contain at least one number and one letter
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    // Show error message
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.classList.add('error');
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
    }

    // Hide error message
    function hideError(input) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
    }

    // Reset form validation states
    function resetFormValidation() {
        form.querySelectorAll('.error-message').forEach(error => error.remove());
        form.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        resetFormValidation();
        
        const accountType = accountTypeInput.value;
        const fields = accountType === 'student' ? studentFields : instructorFields;
        let isValid = true;

        // Validate required fields
        fields.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            }
        });

        // Validate phone number
        const phoneInput = fields.querySelector('input[type="tel"]');
        if (phoneInput && phoneInput.value && !validatePhone(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }

        // Validate email
        const emailInput = fields.querySelector('input[type="email"]');
        if (emailInput && emailInput.value && !validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate password
        const passwordInput = fields.querySelector('input[type="password"]');
        if (passwordInput && passwordInput.value && !validatePassword(passwordInput.value)) {
            showError(passwordInput, 'Password must be at least 8 characters long and contain at least one number and one letter');
            isValid = false;
        }

        // Additional validation for instructor
        if (accountType === 'instructor') {
            // Validate years of experience
            const experienceInput = fields.querySelector('input[name="experience"]');
            if (experienceInput && experienceInput.value) {
                const experience = parseInt(experienceInput.value);
                if (isNaN(experience) || experience < 0 || experience > 50) {
                    showError(experienceInput, 'Please enter a valid number of years (0-50)');
                    isValid = false;
                }
            }

            // Validate CV file
            const cvInput = fields.querySelector('input[name="cv"]');
            if (cvInput && !cvInput.files[0]) {
                showError(cvInput, 'Please upload your CV');
                isValid = false;
            }
        }

        if (isValid) {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success message
                showNotification('Account created successfully! Redirecting...', 'success');
                
                // Redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = accountType === 'student' ? 'student-dashboard.html' : 'instructor-dashboard.html';
                }, 2000);
            }, 1500);
        }
    });

    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Add CSS for notification
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                background: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideIn 0.5s ease, slideOut 0.5s ease 2.5s forwards;
                z-index: 1000;
            }
            
            .notification.success {
                border-left: 4px solid #2ecc71;
            }
            
            .notification.success i {
                color: #2ecc71;
            }
            
            .notification.error {
                border-left: 4px solid #e74c3c;
            }
            
            .notification.error i {
                color: #e74c3c;
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});