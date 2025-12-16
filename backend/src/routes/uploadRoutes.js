const express = require('express');
const router = express.Router();
const {
    uploadDocument,
    getDocument,
    deleteDocument,
    uploadProfilePhoto
} = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// All routes require authentication
router.use(protect);

// Document upload routes
router.post('/:applicationId', upload.single('document'), uploadDocument);
router.get('/:applicationId/:documentId', getDocument);
router.delete('/:applicationId/:documentId', deleteDocument);

// Profile photo upload
router.post('/profile-photo', upload.single('photo'), uploadProfilePhoto);

module.exports = router;
