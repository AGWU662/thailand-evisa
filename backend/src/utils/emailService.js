const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

// Send email
exports.sendEmail = async (options) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `Thailand eVisa Portal <${process.env.EMAIL_FROM}>`,
            to: options.email,
            subject: options.subject,
            html: options.html
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', options.email);
    } catch (error) {
        console.error('Email send error:', error);
        throw new Error('Email could not be sent');
    }
};

// Welcome email template
exports.sendWelcomeEmail = async (user) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a237e;">Welcome to Thailand eVisa Portal!</h2>
            <p>Dear ${user.fullName},</p>
            <p>Thank you for registering with Thailand eVisa Portal. Your account has been created successfully.</p>
            <p>You can now:</p>
            <ul>
                <li>Apply for Thailand visa online</li>
                <li>Track your application status</li>
                <li>Upload required documents</li>
                <li>Make payments securely</li>
            </ul>
            <p>If you have any questions, please contact our support team.</p>
            <br>
            <p>Best regards,<br>Thailand eVisa Team</p>
        </div>
    `;

    await this.sendEmail({
        email: user.email,
        subject: 'Welcome to Thailand eVisa Portal',
        html
    });
};

// Application submitted email
exports.sendApplicationSubmittedEmail = async (user, application) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a237e;">Application Submitted Successfully!</h2>
            <p>Dear ${user.fullName},</p>
            <p>Your visa application has been submitted successfully.</p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <p><strong>Booking Number:</strong> ${application.bookingNumber}</p>
                <p><strong>Visa Type:</strong> ${application.visaType}</p>
                <p><strong>Submitted Date:</strong> ${new Date(application.submittedAt).toLocaleDateString()}</p>
            </div>
            <p>You can track your application status using your booking number.</p>
            <p>Processing time: 3-5 business days</p>
            <br>
            <p>Best regards,<br>Thailand eVisa Team</p>
        </div>
    `;

    await this.sendEmail({
        email: user.email,
        subject: `Application Submitted - ${application.bookingNumber}`,
        html
    });
};

// Application status update email
exports.sendStatusUpdateEmail = async (user, application, newStatus) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a237e;">Application Status Update</h2>
            <p>Dear ${user.fullName},</p>
            <p>Your visa application status has been updated.</p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <p><strong>Booking Number:</strong> ${application.bookingNumber}</p>
                <p><strong>New Status:</strong> <span style="color: #27ae60; font-weight: bold;">${newStatus}</span></p>
                <p><strong>Updated Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            <p>Please login to your account to view more details.</p>
            <br>
            <p>Best regards,<br>Thailand eVisa Team</p>
        </div>
    `;

    await this.sendEmail({
        email: user.email,
        subject: `Status Update - ${application.bookingNumber}`,
        html
    });
};

// Application approved email
exports.sendApprovalEmail = async (user, application) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #27ae60;">🎉 Visa Application Approved!</h2>
            <p>Dear ${user.fullName},</p>
            <p>Congratulations! Your Thailand visa application has been approved.</p>
            <div style="background: #d4edda; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #27ae60;">
                <p><strong>Booking Number:</strong> ${application.bookingNumber}</p>
                <p><strong>Visa Type:</strong> ${application.visaType}</p>
                <p><strong>Approval Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            <p>Please login to your account to download your visa certificate.</p>
            <p><strong>Important:</strong> Please carry a printed copy of your eVisa when traveling to Thailand.</p>
            <br>
            <p>Have a wonderful trip!<br>Thailand eVisa Team</p>
        </div>
    `;

    await this.sendEmail({
        email: user.email,
        subject: `Visa Approved - ${application.bookingNumber}`,
        html
    });
};

// Payment confirmation email
exports.sendPaymentConfirmationEmail = async (user, application, payment) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a237e;">Payment Confirmation</h2>
            <p>Dear ${user.fullName},</p>
            <p>Your payment has been received successfully.</p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <p><strong>Booking Number:</strong> ${application.bookingNumber}</p>
                <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
                <p><strong>Amount Paid:</strong> $${payment.amount} ${payment.currency}</p>
                <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            <p>Your application is now being processed.</p>
            <br>
            <p>Best regards,<br>Thailand eVisa Team</p>
        </div>
    `;

    await this.sendEmail({
        email: user.email,
        subject: `Payment Received - ${application.bookingNumber}`,
        html
    });
};
