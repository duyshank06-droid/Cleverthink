const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Server da chay!');
});

app.listen(3000, () => {
    console.log('Server dang chay tai port 3000');
});