const express = require('express');
const router = express.Router();
const { login, verifyToken, FindNameByToken } = require('../controllers/authController');

router.post('/login', login);
router.post('/verify', verifyToken);
router.get('/user', FindNameByToken);

module.exports = router;
