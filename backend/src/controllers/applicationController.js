const Application = require('../models/Application');
const User = require('../models/User');

// @desc    Create new application
// @route   POST /api/applications
// @access  Private
exports.createApplication = async (req, res) => {
    try {
        // Add user ID to application
        req.body.userId = req.user.id;

        // Get user details
        const user = await User.findById(req.user.id);
        
        // Auto-fill some fields from user profile
        req.body.fullName = req.body.fullName || user.fullName;
        req.body.email = req.body.email || user.email;
        req.body.phone = req.body.phone || user.phone;
        req.body.nationality = req.body.nationality || user.nationality;
        req.body.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
        req.body.passportNumber = req.body.passportNumber || user.passportNumber;

        // Create application
        const application = await Application.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Application created successfully',
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all applications (for current user)
// @route   GET /api/applications
// @access  Private
exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
exports.getApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        // Check if user owns application or is admin
        if (application.userId.toString() !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'manager') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this application'
            });
        }

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get application by booking number
// @route   GET /api/applications/booking/:bookingNumber
// @access  Public
exports.getApplicationByBooking = async (req, res) => {
    try {
        const application = await Application.findOne({ 
            bookingNumber: req.params.bookingNumber 
        }).populate('userId', 'fullName email');

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update application
// @route   PUT /api/applications/:id
// @access  Private
exports.updateApplication = async (req, res) => {
    try {
        let application = await Application.findById(req.params.id);

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
                message: 'Not authorized to update this application'
            });
        }

        // Don't allow updates if already submitted
        if (application.status !== 'Draft' && req.user.role !== 'admin') {
            return res.status(400).json({
                success: false,
                message: 'Cannot update submitted application'
            });
        }

        application = await Application.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: 'Application updated successfully',
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Submit application
// @route   PUT /api/applications/:id/submit
// @access  Private
exports.submitApplication = async (req, res) => {
    try {
        let application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        if (application.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        if (application.status !== 'Draft') {
            return res.status(400).json({
                success: false,
                message: 'Application already submitted'
            });
        }

        application.status = 'Submitted';
        application.submittedAt = new Date();
        await application.save();

        res.status(200).json({
            success: true,
            message: 'Application submitted successfully',
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private
exports.deleteApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        if (application.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        await application.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Application deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ====== ADMIN ONLY ROUTES ======

// @desc    Get all applications (Admin)
// @route   GET /api/applications/admin/all
// @access  Private/Admin
exports.getAllApplications = async (req, res) => {
    try {
        const { status, search, page = 1, limit = 10 } = req.query;

        let query = {};

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Search by booking number, name, email, or passport
        if (search) {
            query.$or = [
                { bookingNumber: { $regex: search, $options: 'i' } },
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { passportNumber: { $regex: search, $options: 'i' } }
            ];
        }

        const applications = await Application.find(query)
            .populate('userId', 'fullName email')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Application.countDocuments(query);

        res.status(200).json({
            success: true,
            count: applications.length,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update application status (Admin)
// @route   PUT /api/applications/:id/status
// @access  Private/Admin
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status, note } = req.body;

        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Application not found'
            });
        }

        application.status = status;

        // Add admin note if provided
        if (note) {
            application.adminNotes.push({
                note,
                addedBy: req.user.id
            });
        }

        // Set approved/rejected dates
        if (status === 'Approved') {
            application.approvedAt = new Date();
        } else if (status === 'Rejected') {
            application.rejectedAt = new Date();
        }

        await application.save();

        res.status(200).json({
            success: true,
            message: 'Application status updated',
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get application statistics (Admin)
// @route   GET /api/applications/admin/stats
// @access  Private/Admin
exports.getApplicationStats = async (req, res) => {
    try {
        const stats = await Application.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const total = await Application.countDocuments();
        const pending = await Application.countDocuments({ status: 'Submitted' });
        const processing = await Application.countDocuments({ status: 'Processing' });
        const approved = await Application.countDocuments({ status: 'Approved' });
        const rejected = await Application.countDocuments({ status: 'Rejected' });

        res.status(200).json({
            success: true,
            data: {
                total,
                pending,
                processing,
                approved,
                rejected,
                breakdown: stats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
