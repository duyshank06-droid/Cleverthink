const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Cho phép GitHub Pages gọi API của bạn

// Cấu hình Nodemailer để gửi email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route nhận dữ liệu form
app.post('/api/register', (req, res) => {
    const { name, phone, subject, slots } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Gửi về chính email của bạn
        subject: 'Có học viên mới đăng ký học!',
        text: `Họ tên: ${name}\nSĐT: ${phone}\nMôn: ${subject}\nLịch rảnh: ${slots.join(', ')}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ message: 'Lỗi gửi email' });
        }
        res.status(200).send({ message: 'Đăng ký thành công!' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại cổng ${PORT}`));
