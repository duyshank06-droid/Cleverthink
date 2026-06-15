const express = require('express');
const cors = require('cors');
const path = require('path'); // Nhập thêm thư viện path
const app = express();

app.use(cors());
app.use(express.json());

// Phục vụ các file tĩnh (CSS, JS, Ảnh)
app.use(express.static('.'));

// CẤU HÌNH QUAN TRỌNG: Trả về file index.html cho trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API nhận dữ liệu
app.post('/api/register', (req, res) => {
    console.log("Dữ liệu nhận được:", req.body);
    res.status(200).json({ message: "Đã nhận dữ liệu thành công!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại port ${PORT}`);
});
