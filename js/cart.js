document.addEventListener('DOMContentLoaded', function() {
    // Cart data structure
    let cart = {
        items: [],
        savedForLater: [],
        couponCode: '',
        discount: 0
    };

    // Sample cart data for testing (يمكنك حذفه لاحقاً)
    cart.items = [
        {
            id: '1',
            title: 'Complete Web Development Bootcamp',
            instructor: 'John Doe',
            image: 'https://via.placeholder.com/150',
            rating: 4.5,
            lectures: 42,
            duration: '12.5 hours',
            level: 'All levels',
            originalPrice: 99.99,
            discountedPrice: 49.99
        }
        // يمكنك إضافة المزيد من العناصر هنا
    ];

    // Load cart data from localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('eduProCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        updateCartDisplay();
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('eduProCart', JSON.stringify(cart));
        updateCartDisplay();
    }

    // Update cart display
    function updateCartDisplay() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const savedItemsContainer = document.querySelector('.saved-items');
        const cartCount = document.querySelector('.cart-count');
        const emptyCart = document.querySelector('.empty-cart');
        const cartContent = document.querySelector('.cart-content');
        const savedForLaterSection = document.querySelector('.saved-for-later');

        // تحديث عدد العناصر في السلة
        cartCount.textContent = `${cart.items.length} Course${cart.items.length !== 1 ? 's' : ''}`;

        // إظهار/إخفاء رسالة السلة الفارغة
        if (cart.items.length === 0) {
            emptyCart.style.display = 'block';
            cartContent.style.display = 'none';
        } else {
            emptyCart.style.display = 'none';
            cartContent.style.display = 'grid';
        }

        // تحديث عناصر السلة
        cartItemsContainer.innerHTML = '';
        cart.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.dataset.id = item.id;
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="item-details">
                    <h3>${item.title}</h3>
                    <div class="instructor">
                        <i class="fas fa-chalkboard-teacher"></i>
                        <span>By ${item.instructor}</span>
                    </div>
                    <div class="rating">
                        ${generateRatingStars(item.rating)}
                        <span>(${item.rating})</span>
                    </div>
                    <div class="course-meta">
                        <span><i class="fas fa-play-circle"></i> ${item.lectures} lectures</span>
                        <span><i class="fas fa-clock"></i> ${item.duration}</span>
                        <span><i class="fas fa-signal"></i> ${item.level}</span>
                    </div>
                </div>
                <div class="item-price">
                    <div class="price-tag">
                        <span class="original-price">$${item.originalPrice.toFixed(2)}</span>
                        <span class="discounted-price">$${item.discountedPrice.toFixed(2)}</span>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                        Remove
                    </button>
                    <button class="save-for-later" data-id="${item.id}">
                        <i class="fas fa-bookmark"></i>
                        Save for later
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // تحديث عناصر المحفوظة للاحقاً
        savedItemsContainer.innerHTML = '';
        if (cart.savedForLater.length > 0) {
            savedForLaterSection.style.display = 'block';
            cart.savedForLater.forEach(item => {
                const savedItem = document.createElement('div');
                savedItem.className = 'cart-item';
                savedItem.dataset.id = item.id;
                savedItem.innerHTML = `
                    <!-- نفس هيكل عناصر السلة مع تغيير الأزرار -->
                    <button class="move-to-cart" data-id="${item.id}">
                        <i class="fas fa-shopping-cart"></i>
                        Move to Cart
                    </button>
                `;
                savedItemsContainer.appendChild(savedItem);
            });
        } else {
            savedForLaterSection.style.display = 'none';
        }

        // تحديث الملخص
        updateSummary();

        // إضافة مستمعي الأحداث للأزرار
        attachButtonListeners();
    }

    // Attach button event listeners
    function attachButtonListeners() {
        // Remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.dataset.id;
                if (confirm('Are you sure you want to remove this course from your cart?')) {
                    cart.items = cart.items.filter(item => item.id !== itemId);
                    saveCart();
                    showNotification('Course removed from cart', 'success');
                }
            });
        });

        // Save for later buttons
        document.querySelectorAll('.save-for-later').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.dataset.id;
                const item = cart.items.find(item => item.id === itemId);
                if (item) {
                    cart.items = cart.items.filter(item => item.id !== itemId);
                    cart.savedForLater.push(item);
                    saveCart();
                    showNotification('Course saved for later', 'success');
                }
            });
        });

        // Move to cart buttons
        document.querySelectorAll('.move-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.dataset.id;
                const item = cart.savedForLater.find(item => item.id === itemId);
                if (item) {
                    cart.savedForLater = cart.savedForLater.filter(item => item.id !== itemId);
                    cart.items.push(item);
                    saveCart();
                    showNotification('Course moved to cart', 'success');
                }
            });
        });
    }

    // Initialize coupon functionality
    function initializeCoupon() {
        const couponInput = document.querySelector('.coupon-input input');
        const applyButton = document.querySelector('.apply-coupon');

        if (applyButton) {
            applyButton.addEventListener('click', function() {
                const code = couponInput.value.trim().toUpperCase();
                
                // Validate coupon code
                const validCoupons = {
                    'SAVE10': 0.10,
                    'SAVE20': 0.20,
                    'SAVE30': 0.30
                };

                if (validCoupons[code]) {
                    cart.couponCode = code;
                    cart.discount = validCoupons[code];
                    saveCart();
                    showNotification(`Coupon applied! ${validCoupons[code] * 100}% discount`, 'success');
                } else {
                    showNotification('Invalid coupon code', 'error');
                }
            });
        }
    }

    // Generate rating stars
    function generateRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    // Update summary section
    function updateSummary() {
        const totals = calculateTotals();
        const summaryItems = document.querySelector('.summary-items');

        if (summaryItems) {
            summaryItems.innerHTML = `
                <div class="summary-item">
                    <span>Original Price:</span>
                    <span>$${totals.original.toFixed(2)}</span>
                </div>
                <div class="summary-item">
                    <span>Discounts:</span>
                    <span class="discount">-$${totals.discount.toFixed(2)}</span>
                </div>
                <div class="summary-item coupon-section">
                    <div class="coupon-input">
                        <input type="text" placeholder="Enter coupon code" value="${cart.couponCode}">
                        <button class="apply-coupon">Apply</button>
                    </div>
                </div>
                <div class="summary-total">
                    <span>Total:</span>
                    <span class="total-price">$${totals.final.toFixed(2)}</span>
                </div>
            `;
            
            // Re-initialize coupon functionality
            initializeCoupon();
        }
    }

    // Calculate cart totals
    function calculateTotals() {
        const totals = {
            original: 0,
            discount: 0,
            final: 0
        };

        cart.items.forEach(item => {
            totals.original += item.originalPrice;
            totals.discount += (item.originalPrice - item.discountedPrice);
        });

        totals.final = totals.original - totals.discount;

        // Apply coupon discount
        if (cart.discount > 0) {
            const couponDiscount = totals.final * cart.discount;
            totals.discount += couponDiscount;
            totals.final -= couponDiscount;
        }

        return totals;
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

    // Initialize cart
    loadCart();
});
