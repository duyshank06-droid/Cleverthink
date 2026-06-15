document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Đổi icon hamburger sang dấu X
        const icon = menuToggle.querySelector('i');
        if(navLinks.classList.contains('active')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // 2. Navbar Shrink on Scroll & Scroll To Top Button
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            scrollTopBtn.classList.add('show');
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            scrollTopBtn.classList.remove('show');
        }
    });

    // Cuộn lên đầu trang
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. Scroll Reveal Animation (Hiệu ứng xuất hiện khi cuộn)
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    // Chạy thử 1 lần khi load trang
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // 4. FAQ Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Đóng tất cả các tab khác lại
            document.querySelectorAll('.accordion-item').forEach(accItem => {
                accItem.classList.remove('active');
            });

            // Nếu tab hiện tại chưa mở thì mở nó ra
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 5. Ngăn chặn reset trang khi submit form (Chỉ dùng để Demo)
    const leadForm = document.getElementById('leadForm');
    if(leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cảm ơn bạn đã đăng ký! Gia sư Đình Duy sẽ liên hệ với bạn trong thời gian sớm nhất.');
            leadForm.reset();
        });
    }
});
