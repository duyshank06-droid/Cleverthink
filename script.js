// Dữ liệu mẫu ban đầu (nếu chưa có trong bộ nhớ máy)
const initialFeedbacks = [
    {
        id: 1718460000000,
        name: "Trần Nguyễn Minh Anh",
        rating: 5,
        content: "Em từng rất sợ môn tiếng Anh, nhưng nhờ thầy Duy chỉ lại từng cấu trúc ngữ pháp cơ bản mà đợt thi vừa rồi em được 8.5 ạ. Em cảm ơn thầy nhiều!",
        isHearted: true
    },
    {
        id: 1718460000001,
        name: "Lê Khôi Nguyên",
        rating: 5,
        content: "Thầy Hoàng lấy gốc cực kỳ dễ hiểu. Cách Thầy hệ thống từ vựng giúp mình nhớ lâu hơn hẳn so với học vẹt trên lớp.",
        isHearted: false
    }
];

// Khởi tạo LocalStorage
let feedbacks = JSON.parse(localStorage.getItem('bku_feedbacks'));
if (!feedbacks) {
    feedbacks = initialFeedbacks;
    localStorage.setItem('bku_feedbacks', JSON.stringify(feedbacks));
}

// Hàm Render (Hiển thị) Feedback ra giao diện
function renderFeedbacks() {
    const feedbackList = document.getElementById('feedbackList');
    feedbackList.innerHTML = '';

    feedbacks.forEach(fb => {
        // Tạo chuỗi sao
        const starsHtml = '⭐'.repeat(fb.rating);
        
        // Trạng thái tim
        const heartClass = fb.isHearted ? 'active' : '';

        const card = document.createElement('div');
        card.className = 'feedback-card';
        card.innerHTML = `
            <div class="feedback-header">
                <span class="student-name">${fb.name}</span>
                <span class="stars">${starsHtml}</span>
            </div>
            <p class="feedback-content">"${fb.content}"</p>
            <div class="admin-controls">
                <button class="control-btn heart-btn ${heartClass}" onclick="toggleHeart(${fb.id})" title="Thả tim">
                    <i class="fa-solid fa-heart"></i>
                </button>
                <button class="control-btn delete-btn" onclick="deleteFeedback(${fb.id})" title="Xóa bình luận">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        feedbackList.appendChild(card);
    });
}

// Xử lý Gửi form
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('fbName').value;
    const rating = parseInt(document.getElementById('fbRating').value);
    const content = document.getElementById('fbContent').value;

    const newFeedback = {
        id: Date.now(), // Tạo ID duy nhất bằng thời gian
        name: name,
        rating: rating,
        content: content,
        isHearted: false
    };

    feedbacks.unshift(newFeedback); // Thêm lên đầu danh sách
    saveAndRender();
    
    // Reset form
    this.reset();
    alert('Cảm ơn bạn đã để lại nhận xét!');
});

// Admin: Thả tim / Bỏ tim
function toggleHeart(id) {
    const fb = feedbacks.find(f => f.id === id);
    if (fb) {
        fb.isHearted = !fb.isHearted;
        saveAndRender();
    }
}

// Admin: Xóa nhận xét
function deleteFeedback(id) {
    if (confirm('Bạn có chắc chắn muốn xóa nhận xét này?')) {
        feedbacks = feedbacks.filter(f => f.id !== id);
        saveAndRender();
    }
}

// Hàm tiện ích lưu và render lại
function saveAndRender() {
    localStorage.setItem('bku_feedbacks', JSON.stringify(feedbacks));
    renderFeedbacks();
}

// Gọi hàm lần đầu khi load trang
renderFeedbacks();
