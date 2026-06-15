// Biến lưu lịch chọn
const selectedSlots = [];

// Xử lý chọn lịch
document.querySelectorAll('.time-slot').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
        const time = this.getAttribute('data-time');
        if(this.classList.contains('active')) {
            selectedSlots.push(time);
        } else {
            const index = selectedSlots.indexOf(time);
            if (index > -1) selectedSlots.splice(index, 1);
        }
    });
});

// Xử lý gửi Form lên Render Backend
document.getElementById('regForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        slots: selectedSlots
    };

    try {
        // THAY URL CỦA BẠN VÀO ĐÂY SAU KHI DEPLOY LÊN RENDER
        const response = await fetch('https://giasu-backend.onrender.com/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Đăng ký thành công! Thầy/Cô sẽ liên hệ sớm.');
            this.reset();
        } else {
            alert('Lỗi hệ thống, vui lòng thử lại.');
        }
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Không kết nối được server.');
    }
});
