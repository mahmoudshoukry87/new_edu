document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.dashboard-nav a');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            sections.forEach(section => section.style.display = 'none');
            
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.style.display = 'block';
        });
    });

    // Profile Image Upload
    const changePhotoBtn = document.querySelector('.change-photo');
    const profileImg = document.querySelector('.profile-image img');

    if (changePhotoBtn) {
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
                        showNotification('Profile picture updated successfully!', 'success');
                    };
                    reader.readAsDataURL(file);
                }
            };
            
            input.click();
        });
    }

    // Course Image Upload
    const courseImageUpload = document.querySelector('.image-upload input[type="file"]');
    if (courseImageUpload) {
        courseImageUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const preview = document.createElement('img');
                    preview.src = event.target.result;
                    preview.style.maxWidth = '100%';
                    preview.style.height = 'auto';
                    preview.style.marginTop = '10px';
                    
                    const container = this.closest('.image-upload');
                    container.appendChild(preview);
                    showNotification('Course image uploaded successfully!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Add New Section
    const addSectionBtn = document.querySelector('.add-section-btn');
    const sectionsContainer = document.querySelector('.sections-container');

    if (addSectionBtn) {
        addSectionBtn.addEventListener('click', function() {
            const sectionNumber = document.querySelectorAll('.course-section').length + 1;
            const sectionHtml = `
                <div class="course-section" data-section="${sectionNumber}">
                    <div class="section-header">
                        <input type="text" placeholder="Section ${sectionNumber} Title" required>
                        <div class="section-actions">
                            <button type="button" class="add-lecture-btn">
                                <i class="fas fa-plus"></i> Add Lecture
                            </button>
                            <button type="button" class="remove-section-btn">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="lectures-container"></div>
                </div>
            `;
            sectionsContainer.insertAdjacentHTML('beforeend', sectionHtml);
            initializeSectionButtons();
            initializeLectureButtons();
        });
    }

    // Initialize Section Buttons
    function initializeSectionButtons() {
        document.querySelectorAll('.remove-section-btn').forEach(btn => {
            btn.onclick = function() {
                if (confirm('Are you sure you want to remove this section?')) {
                    this.closest('.course-section').remove();
                    reorderSections();
                }
            };
        });
    }

    // Reorder Sections
    function reorderSections() {
        document.querySelectorAll('.course-section').forEach((section, index) => {
            const newNumber = index + 1;
            section.setAttribute('data-section', newNumber);
            const titleInput = section.querySelector('input[type="text"]');
            if (titleInput.value === '') {
                titleInput.placeholder = `Section ${newNumber} Title`;
            }
        });
    }

    // Initialize Lecture Buttons
    function initializeLectureButtons() {
        document.querySelectorAll('.add-lecture-btn').forEach(btn => {
            btn.onclick = function() {
                const lecturesContainer = this.closest('.course-section').querySelector('.lectures-container');
                const lectureNumber = lecturesContainer.children.length + 1;
                const lectureHtml = `
                    <div class="lecture-item" data-lecture="${lectureNumber}">
                        <div class="lecture-header">
                            <input type="text" placeholder="Lecture ${lectureNumber} Title" required>
                            <div class="lecture-actions">
                                <input type="file" accept="video/*,application/pdf,.doc,.docx,.ppt,.pptx" class="lecture-file" style="display: none;">
                                <button type="button" class="upload-content-btn">
                                    <i class="fas fa-upload"></i> Upload Content
                                </button>
                                <button type="button" class="remove-lecture-btn">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="lecture-content"></div>
                    </div>
                `;
                lecturesContainer.insertAdjacentHTML('beforeend', lectureHtml);
                initializeUploadButtons();
                initializeRemoveButtons();
            };
        });
    }

    // Initialize Upload Buttons
    function initializeUploadButtons() {
        document.querySelectorAll('.upload-content-btn').forEach(btn => {
            btn.onclick = function() {
                const fileInput = this.closest('.lecture-actions').querySelector('.lecture-file');
                fileInput.click();
            };
        });

        document.querySelectorAll('.lecture-file').forEach(input => {
            input.onchange = function() {
                const file = this.files[0];
                if (file) {
                    const contentContainer = this.closest('.lecture-item').querySelector('.lecture-content');
                    contentContainer.innerHTML = `
                        <div class="file-info">
                            <i class="fas fa-file"></i>
                            <span>${file.name}</span>
                            <small>(${(file.size / (1024 * 1024)).toFixed(2)} MB)</small>
                        </div>
                    `;
                    showNotification('Content uploaded successfully!', 'success');
                }
            };
        });
    }

    // Initialize Remove Buttons
    function initializeRemoveButtons() {
        document.querySelectorAll('.remove-lecture-btn').forEach(btn => {
            btn.onclick = function() {
                if (confirm('Are you sure you want to remove this lecture?')) {
                    const lectureItem = this.closest('.lecture-item');
                    const lecturesContainer = lectureItem.closest('.lectures-container');
                    lectureItem.remove();
                    reorderLectures(lecturesContainer);
                }
            };
        });
    }

    // Reorder Lectures
    function reorderLectures(container) {
        container.querySelectorAll('.lecture-item').forEach((lecture, index) => {
            const newNumber = index + 1;
            lecture.setAttribute('data-lecture', newNumber);
            const titleInput = lecture.querySelector('input[type="text"]');
            if (titleInput.value === '') {
                titleInput.placeholder = `Lecture ${newNumber} Title`;
            }
        });
    }

    // Course Form Submission
    const courseForm = document.querySelector('.course-form');
    if (courseForm) {
        courseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const requiredFields = courseForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Course published successfully!', 'success');
            setTimeout(() => {
                window.location.href = '#courses';
                document.querySelector('[href="#courses"]').click();
            }, 2000);
        });
    }

    // Save Draft Button
    const saveDraftBtn = document.querySelector('.save-draft-btn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            showNotification('Course saved as draft', 'success');
        });
    }

    // Delete Course
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
                const courseCard = this.closest('.course-card');
                courseCard.remove();
                showNotification('Course deleted successfully', 'success');
            }
        });
    });

    // Settings Form Submission
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Profile settings updated successfully!', 'success');
        });
    }

    // Logout Functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = 'login.html';
            }
        });
    }

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

    // Initialize all functions
    initializeSectionButtons();
    initializeLectureButtons();
    initializeUploadButtons();
    initializeRemoveButtons();
});

// إضافة للملف js/instructor-dashboard.js في نهاية الكود داخل DOMContentLoaded

// Edit Course Functionality
function initializeEditButtons() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const editModal = document.getElementById('editCourseModal');
    const closeModal = editModal.querySelector('.close-modal');
    const cancelBtn = editModal.querySelector('.cancel-btn');
    const editForm = editModal.querySelector('.edit-course-form');
    
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            const courseData = {
                title: courseCard.querySelector('h3').textContent,
                image: courseCard.querySelector('.course-image img').src,
                // يمكن إضافة المزيد من البيانات هنا
            };
            
            // Fill the form with course data
            editForm.querySelector('[name="courseTitle"]').value = courseData.title;
            
            // Show current course image
            const previewContainer = editModal.querySelector('.preview-image');
            previewContainer.innerHTML = `<img src="${courseData.image}" alt="Course Preview">`;
            
            // Show modal
            editModal.classList.add('active');
        });
    });
    
    // Close modal functions
    function closeEditModal() {
        editModal.classList.remove('active');
        editForm.reset();
        editModal.querySelector('.preview-image').innerHTML = '';
    }
    
    closeModal.addEventListener('click', closeEditModal);
    cancelBtn.addEventListener('click', closeEditModal);
    
    // Close modal when clicking outside
    editModal.addEventListener('click', function(e) {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
    
    // Handle image upload in edit mode
    const editImageInput = document.getElementById('editCourseImage');
    editImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const previewContainer = editModal.querySelector('.preview-image');
                previewContainer.innerHTML = `<img src="${event.target.result}" alt="Course Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Handle form submission
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const requiredFields = editForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Simulate saving changes
        showNotification('Course updated successfully!', 'success');
        closeEditModal();
        
        // Update course card (demo purpose)
        const newTitle = editForm.querySelector('[name="courseTitle"]').value;
        const newImage = editModal.querySelector('.preview-image img')?.src;
        
        if (newTitle) {
            const courseCard = document.querySelector('.course-card h3');
            if (courseCard) courseCard.textContent = newTitle;
        }
        
        if (newImage) {
            const courseImage = document.querySelector('.course-card .course-image img');
            if (courseImage) courseImage.src = newImage;
        }
    });
}

// Initialize edit buttons when page loads
initializeEditButtons();

// Add error styles
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #e74c3c !important;
    }
    
    .error:focus {
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
    }
`;
document.head.appendChild(style);