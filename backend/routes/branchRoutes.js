// routes/branchRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    createBranch,
    getBranches,
    updateBranch,
    deleteBranch
} = require('../controllers/branchController');

// Protect all routes
router.use(protect);

// Public routes (view branches)
router.get('/', getBranches);

// Admin and Superadmin routes (create, update, delete branches)
router.post('/', authorize('admin', 'superadmin'), createBranch);
router.put('/:id', authorize('admin', 'superadmin'), updateBranch);
router.delete('/:id', authorize('admin', 'superadmin'), deleteBranch);

module.exports = router;

