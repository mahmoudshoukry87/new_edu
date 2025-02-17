document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    const loader = document.querySelector('.video-loader');
    let currentVideo = { section: 0, index: 0 };

    // تحديث التحميل
    function showLoader() {
        loader.style.display = 'flex';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    // تشغيل الفيديو
    function playVideo(videoId, sectionIndex, videoIndex) {
        showLoader();
        videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
        currentVideo = { section: sectionIndex, index: videoIndex };
        updateActiveVideo();
    }

    // تحديث الفيديو النشط
    function updateActiveVideo() {
        document.querySelectorAll('.video-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeVideo = document.querySelector(
            `.video-item[data-section="${currentVideo.section}"][data-index="${currentVideo.index}"]`
        );
        
        if (activeVideo) {
            activeVideo.classList.add('active');
            activeVideo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // التعامل مع نقر الفيديو
    document.addEventListener('click', function(e) {
        const videoItem = e.target.closest('.video-item');
        if (videoItem) {
            const videoId = videoItem.dataset.video;
            const sectionIndex = parseInt(videoItem.dataset.section);
            const videoIndex = parseInt(videoItem.dataset.index);
            playVideo(videoId, sectionIndex, videoIndex);
        }
    });

    // التعامل مع فتح/إغلاق الأقسام
    document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', function() {
            const section = this.parentElement;
            const wasActive = section.classList.contains('active');
            
            // إغلاق كل الأقسام الأخرى
            document.querySelectorAll('.course-section').forEach(s => {
                s.classList.remove('active');
            });

            // فتح/إغلاق القسم الحالي
            if (!wasActive) {
                section.classList.add('active');
            }
        });
    });

    // التعامل مع انتهاء الفيديو
    videoPlayer.addEventListener('ended', function() {
        playNextVideo();
    });

    // تشغيل الفيديو التالي
    function playNextVideo() {
        let nextIndex = currentVideo.index + 1;
        let nextSection = currentVideo.section;

        if (nextIndex >= 4) { // كل قسم به 4 فيديوهات
            nextIndex = 0;
            nextSection++;
            
            if (nextSection >= 5) { // 5 أقسام إجمالاً
                nextSection = 0;
            }
        }

        const nextVideo = document.querySelector(
            `.video-item[data-section="${nextSection}"][data-index="${nextIndex}"]`
        );

        if (nextVideo) {
            nextVideo.click();
        }
    }

    // إخفاء التحميل عند جاهزية الفيديو
    videoPlayer.addEventListener('load', hideLoader);
    
    // تحديد الفيديو الأول كفيديو افتراضي
    const firstVideo = document.querySelector('.video-item');
    if (firstVideo) {
        firstVideo.click();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    let currentVideo = { section: 0, index: 0 };

    // تشغيل الفيديو
    function playVideo(videoId) {
        // إضافة المعلمات المطلوبة للتشغيل التلقائي والتحكم
        const newSrc = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&rel=0`;
        
        // إعادة تحميل iframe بالمصدر الجديد
        videoPlayer.src = newSrc;
    }

    // التعامل مع نقر عناصر الفيديو
    document.querySelectorAll('.video-item').forEach(item => {
        item.addEventListener('click', function() {
            // إزالة الكلاس النشط من جميع العناصر
            document.querySelectorAll('.video-item').forEach(vid => {
                vid.classList.remove('active');
            });

            // إضافة الكلاس النشط للعنصر المحدد
            this.classList.add('active');

            // الحصول على معرف الفيديو وتشغيله
            const videoId = this.getAttribute('data-video');
            currentVideo.section = parseInt(this.getAttribute('data-section'));
            currentVideo.index = parseInt(this.getAttribute('data-index'));
            
            playVideo(videoId);
        });
    });

    // التعامل مع فتح/إغلاق الأقسام
    document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', function(e) {
            // منع انتشار الحدث إذا تم النقر على عنصر الفيديو
            if (e.target.closest('.video-item')) {
                return;
            }

            const section = this.parentElement;
            section.classList.toggle('active');
            
            // تدوير الأيقونة
            const icon = this.querySelector('.toggle-icon');
            if (section.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // تشغيل الفيديو التالي تلقائياً
    function playNextVideo() {
        let nextIndex = currentVideo.index + 1;
        let nextSection = currentVideo.section;

        // التحقق من نهاية القسم
        if (nextIndex >= 4) {
            nextIndex = 0;
            nextSection++;
            
            // التحقق من نهاية الكورس
            if (nextSection >= 5) {
                nextSection = 0;
            }
        }

        // البحث عن الفيديو التالي
        const nextVideo = document.querySelector(
            `.video-item[data-section="${nextSection}"][data-index="${nextIndex}"]`
        );

        if (nextVideo) {
            nextVideo.click();
        }
    }

    // تشغيل الفيديو الأول تلقائياً
    function initializeFirstVideo() {
        const firstVideo = document.querySelector('.video-item');
        if (firstVideo) {
            firstVideo.click();
        }
    }

    // إضافة مستمع لرسائل YouTube Player
    window.addEventListener('message', function(event) {
        if (event.origin !== "https://www.youtube.com") return;
        
        try {
            const data = JSON.parse(event.data);
            if (data.event === 'onStateChange' && data.info === 0) {
                // الفيديو انتهى، تشغيل الفيديو التالي
                playNextVideo();
            }
        } catch (e) {
            // تجاهل الأخطاء في تحليل JSON
        }
    });

    // تهيئة الفيديو الأول
    initializeFirstVideo();
});

// إضافة للـ JavaScript السابق

// تفعيل التابس
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // إزالة الكلاس النشط من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // إزالة الكلاس النشط من جميع المحتويات
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // إضافة الكلاس النشط للزر المحدد
            button.classList.add('active');
            // إظهار المحتوى المرتبط
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // إضافة وظيفة شراء الكورس
    const purchaseButton = document.querySelector('.btn-purchase');
    if (purchaseButton) {
        purchaseButton.addEventListener('click', () => {
            // يمكنك إضافة كود الشراء هنا
            alert('جاري تحويلك إلى صفحة الدفع...');
        });
    }

    // إضافة وظيفة التعليقات
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const textarea = commentForm.querySelector('textarea');
            if (textarea.value.trim()) {
                // يمكنك إضافة كود إرسال التعليق هنا
                alert('تم إرسال تعليقك بنجاح!');
                textarea.value = '';
            }
        });
    }
});