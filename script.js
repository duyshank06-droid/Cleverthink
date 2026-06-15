document.addEventListener("DOMContentLoaded", function () {
    // Tự động vẽ bảng lịch
    const timeGrid = document.getElementById("timeGrid");
    const shifts = ["Sáng", "Chiều", "Tối"];
    const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

    if (timeGrid) {
        // Vẽ header
        const header = document.createElement("div");
        header.className = "time-cell header-cell";
        header.innerText = "Ca / Thứ";
        timeGrid.appendChild(header);
        days.forEach(d => {
            const h = document.createElement("div");
            h.className = "time-cell header-cell";
            h.innerText = d;
            timeGrid.appendChild(h);
        });

        // Vẽ các hàng (Sáng, Chiều, Tối)
        shifts.forEach(shift => {
            const shiftLabel = document.createElement("div");
            shiftLabel.className = "time-cell shift-label";
            shiftLabel.innerText = shift;
            timeGrid.appendChild(shiftLabel);

            days.forEach(day => {
                const slot = document.createElement("div");
                slot.className = "time-cell time-slot";
                slot.dataset.day = day;
                slot.dataset.shift = shift;
                slot.innerHTML = '<i class="fa-solid fa-plus"></i>';
                slot.addEventListener("click", function () {
                    this.classList.toggle("selected");
                    this.innerHTML = this.classList.contains("selected") ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-plus"></i>';
                });
                timeGrid.appendChild(slot);
            });
        });
    }

    // Xử lý gửi form
    const registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const selectedSlots = [];
            document.querySelectorAll(".time-slot.selected").forEach(slot => {
                selectedSlots.push(`${slot.dataset.day} (${slot.dataset.shift})`);
            });

            if (selectedSlots.length === 0) {
                alert("Vui lòng chọn ít nhất một buổi rảnh!");
                return;
            }

            const studentInfo = {
                name: document.getElementById("stuName").value,
                phone: document.getElementById("stuPhone").value,
                subject: document.getElementById("stuSubject").value,
                class: document.getElementById("stuClass").value,
                note: document.getElementById("stuNote").value,
                availableTime: selectedSlots.join(", ")
            };

            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(studentInfo)
                });
                if (response.ok) {
                    alert("Đăng ký thành công!");
                    registrationForm.reset();
                    document.querySelectorAll(".time-slot.selected").forEach(s => {
                        s.classList.remove("selected");
                        s.innerHTML = '<i class="fa-solid fa-plus"></i>';
                    });
                }
            } catch (err) {
                alert("Lỗi kết nối Server! Đảm bảo 'node server.js' đang chạy.");
            }
        });
    }
});
