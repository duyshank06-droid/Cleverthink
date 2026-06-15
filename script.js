// Interactive Schedule
const selectedSlots = [];
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

// Submit Form
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        slots: selectedSlots
    };
    alert('Cảm ơn ' + data.name + '! Chúng tôi đã ghi nhận lịch đăng ký: ' + data.slots.join(', '));
});
