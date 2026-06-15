document.addEventListener("DOMContentLoaded", function () {
    // ================= 1. XỬ LÝ TỰ ĐỘNG IN RA BẢNG THỜI KHÓA BIỂU =================
    const timeGrid = document.getElementById("timeGrid");
    const shifts = ["Sáng", "Chiều", "Tối"];
    const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

    if (timeGrid) {
        shifts.forEach(shift => {
            // Tạo nhãn cột đầu tiên cho mỗi hàng (Sáng / Chiều / Tối)
            const shiftLabel = document.createElement("div");
            shiftLabel.className = "time-cell shift-label";
            shiftLabel.innerText = shift;
            timeGrid.appendChild(shiftLabel);

            // Tạo các ô chọn tương ứng từ Thứ 2 đến Chủ Nhật
            days.forEach(day => {
                const slot = document.createElement("div");
                slot.className = "time-cell time-slot";
                slot.dataset.day = day;
                slot.dataset.shift = shift;
                
                // Hiển thị icon dấu cộng mờ để người dùng biết là bấm vào được
                slot.innerHTML = '<i class="fa-solid fa-plus"></i>';

                // Sự kiện khi bấm vào ô để chọn hoặc bỏ chọn
                slot.addEventListener("click", function () {
                    this.classList.toggle("selected");
                    if (this.classList.contains("selected")) {
                        this.innerHTML = '<i class="fa-solid fa-check"></i>'; // Đổi thành dấu tích xanh
                    } else {
                        this.innerHTML = '<i class="fa-solid fa-plus"></i>'; // Quay lại dấu cộng mờ
                    }
                });

                timeGrid.appendChild(slot);
            });
        });
    }

    // ================= 2. QUẢN LÝ HỆ THỐNG NHẬN XÉT (FEEDBACK) =================
    const feedbackForm = document.getElementById("feedbackForm");
    const feedbackList = document.getElementById("feedbackList");

    // Dữ liệu nhận xét mẫu ban đầu
    let feedbacks = [
        { id: 1, name: "Nguyễn Trung Kiên", rating: 5, content: "Anh Duy dạy cực kỳ dễ hiểu, từ một đứa mất gốc tiếng Anh mà nay em đã tự tin đạt 8.5 điểm trên lớp.", heart: true },
        { id: 2, name: "Trần Minh Anh", rating: 5, content: "Thầy Hoàng siêu dễ thương và kiên nhẫn. Lộ trình ôn thi vào 10 rất sát thực tế.", heart: false },
        { id: 3, name: "Lê Hoàng Long", rating: 4, content: "Thầy Tín dạy Lý siu cuốn lunnn, không bị khô khan lý thuyết mà tập trung giải bài tập rất nhanh.", heart: false }
    ];

    // Hàm hiển thị danh sách nhận xét ra giao diện
    function renderFeedbacks() {
        if (!feedbackList) return;
        feedbackList.innerHTML = "";
        feedbacks.forEach(fb => {
            const stars = "⭐".repeat(fb.rating);
            const card = document.createElement("div");
            card.className = "feedback-card";
            card.innerHTML = `
                <div class="feedback-header">
                    <span class="student-name">${fb.name}</span>
                    <span class="stars">${stars}</span>
                </div>
                <p class="feedback-content">"${fb.content}"</p>
                <div class="admin-controls">
                    <button class="control-btn heart-btn ${fb.heart ? 'active' : ''}" onclick="toggleHeart(${fb.id})">
                        <i class="fa-${fb.heart ? 'solid' : 'regular'} fa-heart"></i>
                    </button>
                    <button class="control-btn delete-btn" onclick="deleteFeedback(${fb.id})">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            `;
            feedbackList.appendChild(card);
        });
    }

    // Xử lý khi gửi form nhận xét mới
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("fbName").value;
            const rating = parseInt(document.getElementById("fbRating").value);
            const content = document.getElementById("fbContent").value;

            const newFb = {
                id: Date.now(),
                name: name,
                rating: rating,
                content: content,
                heart: false
            };

            feedbacks.unshift(newFb); // Thêm nhận xét mới lên đầu danh sách
            renderFeedbacks();
            feedbackForm.reset(); // Xóa sạch dữ liệu vừa nhập trong form
        });
    }

    // Hàm Thả tim / Bỏ thả tim nhận xét
    window.toggleHeart = function (id) {
        feedbacks = feedbacks.map(fb => {
            if (fb.id === id) fb.heart = !fb.heart;
            return fb;
        });
        renderFeedbacks();
    };

    // Hàm Xóa nhận xét
    window.deleteFeedback = function (id) {
        if (confirm("Bạn có chắc chắn muốn xóa nhận xét này không?")) {
            feedbacks = feedbacks.filter(fb => fb.id !== id);
            renderFeedbacks();
        }
    };

    // Chạy hiển thị feedback ngay khi tải trang
    renderFeedbacks();

    // ================= 3. XỬ LÝ GỬI FORM ĐĂNG KÝ HỌC =================
    const registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Thu thập các buổi rảnh đã chọn trên lịch
            const selectedSlots = [];
            document.querySelectorAll(".time-slot.selected").forEach(slot => {
                selectedSlots.push(`${slot.dataset.day} (${slot.dataset.shift})`);
            });

            if (selectedSlots.length === 0) {
                alert("Vui lòng chọn ít nhất một buổi rảnh trên lịch để chúng tôi xếp gia sư!");
                return;
            }

            // Thu thập thông tin học sinh
            const studentInfo = {
                name: document.getElementById("stuName").value,
                phone: document.getElementById("stuPhone").value,
                subject: document.getElementById("stuSubject").value,
                class: document.getElementById("stuClass").value,
                note: document.getElementById("stuNote").value,
                availableTime: selectedSlots.join(", ")
            };

            // Hiển thị thông báo đăng ký thành công tạm thời
            alert(`Chúc mừng ${studentInfo.name} đã đăng ký thành công!\n\nMôn học: ${studentInfo.subject} - Lớp: ${studentInfo.class}\nLịch rảnh: ${studentInfo.availableTime}\n\nĐội ngũ Gia sư Đình Duy sẽ liên hệ với bạn qua số ${studentInfo.phone} trong vòng 24h.`);
            
            // Reset form và lịch sau khi đăng ký thành công
            registrationForm.reset();
            document.querySelectorAll(".time-slot.selected").forEach(slot => {
                slot.classList.remove("selected");
                slot.innerHTML = '<i class="fa-solid fa-plus"></i>';
            });
        });
    }
});
