// routes/regionRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    createRegion,
    getRegions,
    updateRegion,
    deleteRegion
} = require('../controllers/regionController');

// Protect all routes
router.use(protect);

// Public routes (view regions)
router.get('/', getRegions);

// Admin and Superadmin routes (create, update, delete regions)
router.post('/', authorize('admin', 'superadmin'), createRegion);
router.put('/:id', authorize('admin', 'superadmin'), updateRegion);
router.delete('/:id', authorize('admin', 'superadmin'), deleteRegion);

module.exports = router;
