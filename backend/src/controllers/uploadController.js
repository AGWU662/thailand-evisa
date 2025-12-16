const Application = require('../models/Application');
const path = require('path');
const fs = require('fs');

// @desc    Upload document
// @route   POST /api/upload/:applicationId
// @access  Private
exports.uploadDocument = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { documentType } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a file'
            });
        }

        const application = await Application.findById(applicationId);

        if (!application) {
            // Delete uploaded file if application not found
            fs.unlinkSync(req.file.path);
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Check authorization
        if (application.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            fs.unlinkSync(req.file.path);
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        // Add document to application
        application.documents.push({
            documentType: documentType || 'Other',
            fileName: req.file.originalname,
            filePath: req.file.path,
            status: 'Uploaded'
        });

        await application.save();

        res.status(200).json({
            success: true,
            message: 'Document uploaded successfully',
            data: {
                fileName: req.file.originalname,
                filePath: req.file.path,
                documentType: documentType || 'Other'
            }
        });
    } catch (error) {
        // Clean up file if error occurs
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get document
// @route   GET /api/upload/:applicationId/:documentId
// @access  Private
exports.getDocument = async (req, res) => {
    try {
        const { applicationId, documentId } = req.params;

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Check authorization
        if (application.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        const document = application.documents.id(documentId);

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        // Send file
        res.sendFile(path.resolve(document.filePath));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete document
// @route   DELETE /api/upload/:applicationId/:documentId
// @access  Private
exports.deleteDocument = async (req, res) => {
    try {
        const { applicationId, documentId } = req.params;

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Check authorization
        if (application.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        const document = application.documents.id(documentId);

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        // Delete file from filesystem
        if (fs.existsSync(document.filePath)) {
            fs.unlinkSync(document.filePath);
        }

        // Remove from database
        application.documents.pull(documentId);
        await application.save();

        res.status(200).json({
            success: true,
            message: 'Document deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Upload profile photo
// @route   POST /api/upload/profile-photo
// @access  Private
exports.uploadProfilePhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a photo'
            });
        }

        const User = require('../models/User');
        const user = await User.findById(req.user.id);

        // Delete old photo if exists
        if (user.profilePhoto && fs.existsSync(user.profilePhoto)) {
            fs.unlinkSync(user.profilePhoto);
        }

        // Update user profile photo
        user.profilePhoto = req.file.path;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile photo uploaded successfully',
            data: {
                photoPath: req.file.path
            }
        });
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
