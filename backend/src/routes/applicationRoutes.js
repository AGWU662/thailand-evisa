const express = require('express');
const router = express.Router();
const {
    createApplication,
    getMyApplications,
    getApplication,
    getApplicationByBooking,
    updateApplication,
    submitApplication,
    deleteApplication,
    getAllApplications,
    updateApplicationStatus,
    getApplicationStats
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/booking/:bookingNumber', getApplicationByBooking);

// Protected routes (User)
router.use(protect); // All routes below require authentication

router.route('/')
    .get(getMyApplications)
    .post(createApplication);

router.route('/:id')
    .get(getApplication)
    .put(updateApplication)
    .delete(deleteApplication);

router.put('/:id/submit', submitApplication);

// Admin routes
router.get('/admin/all', authorize('admin', 'manager'), getAllApplications);
router.get('/admin/stats', authorize('admin', 'manager'), getApplicationStats);
router.put('/:id/status', authorize('admin', 'manager'), updateApplicationStatus);

module.exports = router;
