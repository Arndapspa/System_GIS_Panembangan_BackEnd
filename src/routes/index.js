const express = require('express');
const { handleDeleteUser, verifyToken, decodeToken, updatePassword, register } = require('../controllers');
const router = express.Router();
const admin = require('../config/firebase'); // Impor Firebase admin

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello' });
});

// Daftar (Sign Up) Route
router.get('/decode', decodeToken);

// Daftar (Sign Up) Route
router.post('/register', register);

// Update password
router.post('/update-password', verifyToken, updatePassword)

// Route untuk menghapus pengguna berdasarkan UID
router.delete('/user/:uid', handleDeleteUser);

module.exports = router;