// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    createCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');

// Protect all routes
router.use(protect);

// Public routes (view customers)
router.get('/', getCustomers);

// Admin and Superadmin routes (create, update, delete customers)
router.post('/', authorize('admin', 'superadmin'), createCustomer);
router.put('/:id', authorize('admin', 'superadmin'), updateCustomer);
router.delete('/:id', authorize('admin', 'superadmin'), deleteCustomer);

module.exports = router;
