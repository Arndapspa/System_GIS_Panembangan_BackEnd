require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Ini penting untuk parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware untuk parsing JSON (jika diperlukan)
app.use(express.json());

app.use(cors({
  origin: 'https://system-gis-pbb.vercel.app',
}));

// Route untuk user
app.use('/api', userRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});