// 1. Menu Mobile Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 2. Xử lý gửi Form (Demo)
const regForm = document.getElementById('registrationForm');
if (regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn trang web tải lại
        
        // Lấy dữ liệu
        const name = document.getElementById('stuName').value;
        
        // Hiển thị thông báo
        alert(`Cảm ơn ${name}! Chúng tôi đã nhận được thông tin và sẽ liên hệ với bạn sớm nhất.`);
        regForm.reset(); // Xóa sạch form
    });
}

// 3. Hiệu ứng cuộn mượt mà
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Đóng menu nếu đang mở trên mobile
        navLinks.classList.remove('active');
    });
});
