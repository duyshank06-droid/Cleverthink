const express = require('express');
const path = require('path');
const app = express();

// --- ĐÂY LÀ DÒNG QUAN TRỌNG NHẤT ---
// Nó cho phép server phục vụ tất cả các file (css, js, ảnh) nằm cùng thư mục với server.js
app.use(express.static(__dirname));

// Route cho trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Cấu hình cổng chạy (Render cần process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại port ${PORT}`);
});
