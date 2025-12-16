const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const applicationSchema = new mongoose.Schema({
    bookingNumber: {
        type: String,
        unique: true,
        default: () => `TH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    // Personal Information
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    passportNumber: {
        type: String,
        required: true
    },
    passportIssueDate: {
        type: Date,
        required: true
    },
    passportExpiryDate: {
        type: Date,
        required: true
    },
    
    // Visa Details
    visaType: {
        type: String,
        enum: ['Tourist Visa (TR)', 'Business Visa (B)', 'Student Visa (ED)', 'Medical Visa (MT)', 'Transit Visa'],
        required: true
    },
    entryType: {
        type: String,
        enum: ['Single Entry', 'Multiple Entry'],
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    purposeOfVisit: {
        type: String,
        required: true
    },
    intendedArrivalDate: {
        type: Date,
        required: true
    },
    
    // Address Information
    residentialAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    },
    
    // Thailand Information
    thailandAddress: {
        hotel: String,
        address: String,
        city: String
    },
    
    // Embassy
    submittedTo: {
        type: String,
        required: true
    },
    
    // Documents
    documents: [{
        documentType: {
            type: String,
            enum: ['Passport Photo', 'Passport Copy', 'Flight Booking', 'Hotel Reservation', 'Bank Statement', 'Other'],
            required: true
        },
        fileName: String,
        filePath: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['Pending', 'Uploaded', 'Verified', 'Rejected'],
            default: 'Pending'
        }
    }],
    
    // Application Status
    status: {
        type: String,
        enum: ['Draft', 'Submitted', 'Under Review', 'Documents Required', 'Processing', 'Approved', 'Rejected', 'Cancelled'],
        default: 'Draft'
    },
    
    // Payment
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
        default: 'Pending'
    },
    paymentAmount: {
        type: Number,
        default: 40
    },
    paymentId: String,
    paymentDate: Date,
    
    // Timeline
    timeline: [{
        status: String,
        description: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    
    // Admin Notes
    adminNotes: [{
        note: String,
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    // Dates
    submittedAt: Date,
    approvedAt: Date,
    rejectedAt: Date,
    
}, {
    timestamps: true
});

// Add timeline entry automatically on status change
applicationSchema.pre('save', function(next) {
    if (this.isModified('status')) {
        this.timeline.push({
            status: this.status,
            description: `Application status changed to ${this.status}`,
            timestamp: new Date()
        });
    }
    next();
});

module.exports = mongoose.model('Application', applicationSchema);
