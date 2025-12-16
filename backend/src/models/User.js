const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide full name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        select: false
    },
    phone: {
        type: String,
        required: [true, 'Please provide phone number']
    },
    nationality: {
        type: String,
        required: [true, 'Please provide nationality']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Please provide date of birth']
    },
    passportNumber: {
        type: String,
        required: [true, 'Please provide passport number'],
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user'
    },
    profilePhoto: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
