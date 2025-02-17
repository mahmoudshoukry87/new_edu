document.addEventListener('DOMContentLoaded', function() {
    // Get cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('eduProCart')) || { items: [], discount: 0 };
    
    // Format card number with spaces
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value;
        
        // Update card icon
        updateCardIcon(value);
    });

    // Format expiration date (MM/YY)
    const expDateInput = document.getElementById('expDate');
    expDateInput?.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        
        e.target.value = value;
    });

    // Format CVV (numbers only)
    const cvvInput = document.getElementById('cvv');
    cvvInput?.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Validate expiration date
    function validateExpDate(value) {
        if (!value) return false;
        
        const [month, year] = value.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        const expMonth = parseInt(month);
        const expYear = parseInt(year);

        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
            return false;
        }

        return expMonth >= 1 && expMonth <= 12;
    }

    // Update card icon based on number
    function updateCardIcon(number) {
        const visa = /^4/;
        const mastercard = /^5[1-5]/;
        const amex = /^3[47]/;
        
        const icons = document.querySelectorAll('.card-icons i');
        icons.forEach(icon => icon.style.opacity = '0.3');

        if (visa.test(number)) {
            document.querySelector('.fa-cc-visa').style.opacity = '1';
        } else if (mastercard.test(number)) {
            document.querySelector('.fa-cc-mastercard').style.opacity = '1';
        } else if (amex.test(number)) {
            document.querySelector('.fa-cc-amex').style.opacity = '1';
        }
    }

    // Update order summary
    function updateOrderSummary() {
        const summaryItems = document.querySelector('.summary-items');
        const subtotalElement = document.querySelector('.subtotal');
        const discountElement = document.querySelector('.discount');
        const totalElement = document.querySelector('.total-price');

        // Clear existing items
        summaryItems.innerHTML = '';

        // Calculate totals
        let subtotal = 0;
        let discount = 0;

        // Add items to summary
        cart.items.forEach(item => {
            subtotal += item.originalPrice;
            discount += (item.originalPrice - item.discountedPrice);

            const itemElement = document.createElement('div');
            itemElement.className = 'summary-row';
            itemElement.innerHTML = `
                <span>${item.title}</span>
                <span>$${item.discountedPrice.toFixed(2)}</span>
            `;
            summaryItems.appendChild(itemElement);
        });

        // Apply coupon discount if any
        if (cart.discount > 0) {
            const couponDiscount = (subtotal - discount) * cart.discount;
            discount += couponDiscount;
        }

        // Update totals
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        discountElement.textContent = `-$${discount.toFixed(2)}`;
        totalElement.textContent = `$${(subtotal - discount).toFixed(2)}`;
    }

    // Toggle payment method details
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const cardDetails = document.getElementById('cardDetails');

    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });

    // Form validation and submission
    const paymentForm = document.getElementById('paymentForm');
    paymentForm?.addEventListener('submit', function(e) {
        e.preventDefault();

        // Reset previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        let isValid = true;

        // Validate required fields
        const requiredFields = this.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            }
        });

        // Validate card number (if credit card payment)
        if (document.querySelector('input[name="paymentMethod"]:checked').value === 'card') {
            const cardNumber = cardNumberInput.value.replace(/\s/g, '');
            if (!/^\d{16}$/.test(cardNumber)) {
                showError(cardNumberInput, 'Invalid card number');
                isValid = false;
            }

            // Validate expiration date
            if (!validateExpDate(expDateInput.value)) {
                showError(expDateInput, 'Invalid expiration date');
                isValid = false;
            }

            // Validate CVV
            if (!/^\d{3,4}$/.test(cvvInput.value)) {
                showError(cvvInput, 'Invalid CVV');
                isValid = false;
            }
        }

        if (isValid) {
            // Show loading state
            const payButton = document.querySelector('.pay-button');
            payButton.disabled = true;
            payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            // Simulate payment processing
            setTimeout(() => {
                // Show success message
                showNotification('Payment successful! Redirecting to your courses...', 'success');
                
                // Clear cart
                localStorage.removeItem('eduProCart');

                // Redirect to courses page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'my-courses.html';
                }, 2000);
            }, 1500);
        }
    });

    // Show error message
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        input.classList.add('error');
        formGroup.appendChild(errorDiv);
    }

    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Add styles for notification
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
            
            .notification.error {
                border-left: 4px solid #e74c3c;
            }
            
            .error-message {
                color: #e74c3c;
                font-size: 14px;
                margin-top: 5px;
            }
            
            .error {
                border-color: #e74c3c !important;
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

    // Initialize order summary on page load
    updateOrderSummary();
});