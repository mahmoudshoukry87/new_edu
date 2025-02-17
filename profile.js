document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.profile-nav a');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => section.style.display = 'none');
            
            // Show selected section
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.style.display = 'block';
        });
    });

    // Profile Image Upload
    const changePhotoBtn = document.querySelector('.change-photo');
    const profileImg = document.querySelector('.profile-image img');

    changePhotoBtn.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    profileImg.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });

    // Settings Form
    const settingsForm = document.querySelector('.settings-form');
    
    settingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        showNotification('Changes saved successfully!', 'success');
    });

    // Password Toggle
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
        
        input.parentNode.style.position = 'relative';
        input.parentNode.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', function() {
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            this.innerHTML = type === 'password' ? 
                '<i class="fas fa-eye"></i>' : 
                '<i class="fas fa-eye-slash"></i>';
        });
    });

    // Logout Functionality
    const logoutBtn = document.querySelector('.logout-btn');
    
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            // Add logout logic here
            window.location.href = 'login.html';
        }
    });

    // Delete Account Modal
    const deleteBtn = document.querySelector('.delete-account-btn');
    const modal = document.getElementById('deleteModal');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const confirmDeleteBtn = modal.querySelector('.confirm-delete-btn');
    
    deleteBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });
    
    cancelBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    confirmDeleteBtn.addEventListener('click', function() {
        // Add delete account logic here
        showNotification('Account deleted successfully', 'success');
        setTimeout(() => {
            window.location.href = 'register.html';
        }, 2000);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Notification System
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
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Update last login time
    const currentTime = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    // You can display this somewhere in the profile if needed
    console.log('Last login:', currentTime);
});