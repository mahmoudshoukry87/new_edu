// بيانات الكورسات (يمكن استبدالها بطلب API حقيقي)
const courses = [
    {
        id: 1,
        title: "تطوير تطبيقات الويب",
        instructor: "أحمد محمد",
        image: "https://via.placeholder.com/300x200",
        rating: 4.8,
        students: 1200,
        price: 199
    },
    {
        id: 2,
        title: "تصميم واجهات المستخدم",
        instructor: "سارة أحمد",
        image: "https://via.placeholder.com/300x200",
        rating: 4.9,
        students: 800,
        price: 149
    },
    {
        id: 3,
        title: "مقدمة في الذكاء الاصطناعي",
        instructor: "محمد علي",
        image: "https://via.placeholder.com/300x200",
        rating: 4.7,
        students: 1500,
        price: 299
    }
];

// دالة لإنشاء بطاقة كورس
function createCourseCard(course) {
    return `
        <div class="course-card">
            <img src="${course.image}" alt="${course.title}">
            <div class="course-content">
                <h3>${course.title}</h3>
                <p>${course.instructor}</p>
                <div class="course-meta">
                    <span>⭐ ${course.rating}</span>
                    <span>${course.students} طالب</span>
                </div>
                <div class="course-price">
                    <span class="price">${course.price} جنيه</span>
                    <button class="btn register">اشترك الآن</button>
                </div>
            </div>
        </div>
    `;
}

// عرض الكورسات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const coursesGrid = document.getElementById('coursesGrid');
    coursesGrid.innerHTML = courses.map(course => createCourseCard(course)).join('');

    // إضافة وظيفة البحث
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // يمكن إضافة منطق البحث هنا
            alert(`جاري البحث عن: ${searchTerm}`);
        }
    });
});