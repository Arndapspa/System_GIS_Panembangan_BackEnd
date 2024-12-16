const admin = require('../config/firebase');

// Fungsi untuk menghapus pengguna
const deleteUser = async (uid) => {
  try {
    await admin.auth().deleteUser(uid);
    console.log(`Successfully deleted user with UID: ${uid}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Handler untuk Express route
const handleDeleteUser = async (req, res) => {
  const uid = req.params.uid;

  try {
    await deleteUser(uid);
    res.status(200).json({ message: `Successfully deleted user with UID: ${uid}` });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

// Middleware untuk verifikasi token (opsional, jika ingin memastikan user login)
const decodeToken = (req, res, next) => {
  const idToken = req.headers.authorization.split('Bearer ')[1];

  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      if (decodedToken.uid)
        return res.status(200).json({ message: 'Authorized' });
    })
    .catch((error) => {
      console.log(error);
      
      return res.status(401).json({ message: 'Unauthorized' });
    });
};

// Middleware untuk verifikasi token (opsional, jika ingin memastikan user login)
const verifyToken = (req, res, next) => {
  const idToken = req.headers.authorization.split('Bearer ')[1];

  admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      req.uid = decodedToken.uid;
      next();
    })
    .catch((error) => {
      console.log(error);
      
      return res.status(401).json({ message: 'Unauthorized' });
    });
};

const updatePassword = async (req, res) => {
  const { password } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password harus minimal 8 karakter' });
  }

  try {
    // Update password user
    await admin.auth().updateUser(req.uid, { password: password });

    res.status(200).json({ message: 'Password berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui password', error: error.message });
  }
}

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Membuat pengguna baru
      const userRecord = await admin.auth().createUser({
          email,
          password,
      });
      res.status(200).json({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
      console.error(' creating new useErrorr:', error);
      res.status(400).json({ error: error.message });
  }
}


module.exports = { handleDeleteUser, verifyToken, updatePassword, register, decodeToken };