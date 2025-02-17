document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgotPasswordForm');
    const successMessage = document.querySelector('.success-message');
    const resendButton = document.querySelector('.resend-button');
    let emailInput;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        emailInput = form.querySelector('input[type="email"]');
        const errorMessage = document.querySelector('.error-message');
        
        // Reset error message
        errorMessage.style.display = 'none';
        
        // Validate email
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            return;
        }

        // Simulate sending reset link
        form.style.display = 'none';
        successMessage.style.display = 'block';

        // Store email in localStorage for resend functionality
        localStorage.setItem('resetEmail', emailInput.value);
    });

    resendButton.addEventListener('click', function() {
        const email = localStorage.getItem('resetEmail');
        if (email) {
            // Simulate resending email
            this.textContent = 'Sending...';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = 'Resend Email';
                this.disabled = false;
                showResendConfirmation();
            }, 2000);
        }
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, message) {
        const errorElement = input.closest('.form-group').querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.classList.add('error');
    }

    function showResendConfirmation() {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = 'Reset link has been resent to your email';
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Add CSS for toast message
    const style = document.createElement('style');
    style.textContent = `
        .toast-message {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #2ecc71;
            color: white;
            padding: 12px 24px;
            border-radius: 5px;
            font-size: 14px;
            animation: fadeInOut 3s ease;
            z-index: 1000;
        }

        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, 20px); }
            10% { opacity: 1; transform: translate(-50%, 0); }
            90% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, -20px); }
        }
    `;
    document.head.appendChild(style);
});