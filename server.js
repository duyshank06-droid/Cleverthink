const express = require('express');
const path = require('path');
const app = express();

// Đảm bảo trỏ đúng thư mục gốc của dự án
app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Thêm cái này để kiểm tra xem server có đang chạy ổn không
app.get('/test', (req, res) => {
    res.send("Server dang chay tot!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
