const express = require('express');
const router = express.Router();
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// حماية جميع المسارات بـ protect
router.use(protect);

// إنشاء حساب (متاح للسوبر ادمن فقط)
router.post('/', authorize('superadmin'), createUser);

// عرض الحسابات (متاح للسوبر ادمن والإدمن فقط)
router.get('/', authorize('superadmin', 'admin'), getUsers);

// تعديل الحساب (مفتوح لجميع المستخدمين لتعديل حساباتهم الخاصة، وللسوبر ادمن لتعديل أي حساب)
router.put('/:id', authorize('superadmin', 'admin', 'user'), updateUser);

// حذف الحساب (متاح للسوبر ادمن فقط)
router.delete('/:id', authorize('superadmin'), deleteUser);

module.exports = router;
