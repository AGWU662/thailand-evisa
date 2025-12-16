const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Stripe', 'Bank Transfer'],
        required: true
    },
    transactionId: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed', 'Failed', 'Refunded'],
        default: 'Pending'
    },
    paymentDetails: {
        cardLast4: String,
        cardBrand: String,
        payerEmail: String
    },
    receiptUrl: String,
    refundReason: String,
    refundedAt: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
