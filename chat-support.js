/**
 * Thailand E-Visa Portal - Customer Support Integration
 * This file provides multiple customer support options including live chat and WhatsApp
 * 
 * CONFIGURATION REQUIRED BEFORE PRODUCTION:
 * 1. Update WHATSAPP_NUMBER with your business WhatsApp number
 * 2. Update SUPPORT_EMAIL with your actual support email
 * 3. Update SUPPORT_PHONE with your actual support phone number
 * 4. Uncomment and configure Tawk.to integration if you want live agent chat
 */

// ==================== CONFIGURATION ====================
// TODO: Replace these placeholder values with real contact information
const WHATSAPP_NUMBER = '66123456789'; // Replace with your WhatsApp Business number (format: country code + number)
const SUPPORT_EMAIL = 'support@thailand-evisa.com'; // Replace with your actual support email
const SUPPORT_PHONE = '+66123456789'; // Replace with your actual support phone number
// =======================================================

// Initialize Tawk.to Live Chat Widget (Free)
// Replace 'YOUR_PROPERTY_ID' and 'YOUR_WIDGET_ID' with actual values from https://tawk.to
function initializeTawkTo() {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    (function() {
        // For now using a demo widget ID - replace with your actual Tawk.to credentials
        var s1 = document.createElement("script");
        var s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        // Demo widget - replace with: s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
        s1.src = 'https://embed.tawk.to/DEMO/default'; // This is a placeholder
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        
        // Only load in production when you have real credentials
        // s0.parentNode.insertBefore(s1, s0);
    })();
}

// WhatsApp Support Button
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('div');
    whatsappBtn.id = 'whatsapp-support-btn';
    whatsappBtn.innerHTML = `
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=Hello, I need help with my Thailand e-visa application" 
           target="_blank" 
           rel="noopener noreferrer"
           title="Chat with us on WhatsApp"
           style="text-decoration: none;">
            <i class="fab fa-whatsapp"></i>
            <span>WhatsApp Support</span>
        </a>
    `;
    
    const styles = `
        #whatsapp-support-btn {
            position: fixed;
            bottom: 80px;
            right: 20px;
            z-index: 9998;
            animation: slideIn 0.5s ease-out;
        }
        
        #whatsapp-support-btn a {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #25D366;
            color: white;
            padding: 12px 20px;
            border-radius: 50px;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
            font-weight: 600;
            font-size: 14px;
        }
        
        #whatsapp-support-btn a:hover {
            background: #128C7E;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(37, 211, 102, 0.6);
        }
        
        #whatsapp-support-btn i {
            font-size: 24px;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            #whatsapp-support-btn a span {
                display: none;
            }
            
            #whatsapp-support-btn a {
                padding: 15px;
                border-radius: 50%;
                width: 56px;
                height: 56px;
                justify-content: center;
            }
            
            #whatsapp-support-btn {
                bottom: 70px;
                right: 15px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    document.body.appendChild(whatsappBtn);
}

// Live Chat Support Button (Alternative to Tawk.to for demo)
function createLiveChatButton() {
    const chatBtn = document.createElement('div');
    chatBtn.id = 'live-chat-btn';
    chatBtn.innerHTML = `
        <button onclick="openChatModal()" title="Live Chat Support">
            <i class="fas fa-comments"></i>
            <span class="chat-badge">1</span>
        </button>
    `;
    
    const styles = `
        #live-chat-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            animation: slideIn 0.5s ease-out;
        }
        
        #live-chat-btn button {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
            position: relative;
        }
        
        #live-chat-btn button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        #live-chat-btn .chat-badge {
            position: absolute;
            top: 0;
            right: 0;
            background: #ef4444;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            border: 2px solid white;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    document.body.appendChild(chatBtn);
}

// Chat Modal
function createChatModal() {
    const modal = document.createElement('div');
    modal.id = 'chat-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="chat-modal-content">
            <div class="chat-header">
                <div>
                    <h3><i class="fas fa-headset"></i> Customer Support</h3>
                    <p class="status"><span class="status-dot"></span> We're online</p>
                </div>
                <button onclick="closeChatModal()" class="close-btn">&times;</button>
            </div>
            <div class="chat-body">
                <div class="chat-message bot">
                    <div class="message-content">
                        <p>👋 Hello! Welcome to Thailand E-Visa Portal support.</p>
                        <p>How can we help you today?</p>
                    </div>
                    <span class="message-time">Just now</span>
                </div>
                <div class="quick-actions">
                    <button onclick="selectQuery('application-status')">
                        📋 Check Application Status
                    </button>
                    <button onclick="selectQuery('visa-requirements')">
                        📄 Visa Requirements
                    </button>
                    <button onclick="selectQuery('payment-issue')">
                        💳 Payment Issues
                    </button>
                    <button onclick="selectQuery('document-upload')">
                        📎 Document Upload Help
                    </button>
                </div>
            </div>
            <div class="chat-footer">
                <div class="contact-options">
                    <p>Need immediate assistance?</p>
                    <div class="contact-buttons">
                        <a href="mailto:${SUPPORT_EMAIL}" class="contact-btn email">
                            <i class="fas fa-envelope"></i> Email Us
                        </a>
                        <a href="tel:${SUPPORT_PHONE}" class="contact-btn phone">
                            <i class="fas fa-phone"></i> Call Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const styles = `
        #chat-modal {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 380px;
            max-width: calc(100vw - 40px);
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .chat-modal-content {
            display: flex;
            flex-direction: column;
            height: 500px;
            max-height: calc(100vh - 150px);
        }
        
        .chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 16px 16px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .chat-header h3 {
            margin: 0;
            font-size: 18px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .chat-header .status {
            font-size: 12px;
            margin: 4px 0 0 0;
            opacity: 0.9;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .status-dot {
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 32px;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            line-height: 1;
            transition: transform 0.2s;
        }
        
        .close-btn:hover {
            transform: rotate(90deg);
        }
        
        .chat-body {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f9fafb;
        }
        
        .chat-message {
            margin-bottom: 16px;
        }
        
        .chat-message.bot .message-content {
            background: white;
            padding: 12px 16px;
            border-radius: 12px;
            display: inline-block;
            max-width: 80%;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .chat-message.bot .message-content p {
            margin: 0 0 8px 0;
        }
        
        .chat-message.bot .message-content p:last-child {
            margin-bottom: 0;
        }
        
        .message-time {
            font-size: 11px;
            color: #6b7280;
            margin-top: 4px;
            display: block;
        }
        
        .quick-actions {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
            margin-top: 16px;
        }
        
        .quick-actions button {
            background: white;
            border: 2px solid #e5e7eb;
            padding: 12px 16px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
        }
        
        .quick-actions button:hover {
            border-color: #667eea;
            background: #f0f4ff;
            transform: translateX(4px);
        }
        
        .chat-footer {
            padding: 16px 20px;
            border-top: 1px solid #e5e7eb;
            background: white;
            border-radius: 0 0 16px 16px;
        }
        
        .contact-options p {
            font-size: 13px;
            color: #6b7280;
            margin: 0 0 12px 0;
            text-align: center;
        }
        
        .contact-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }
        
        .contact-btn {
            padding: 10px 12px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.2s;
        }
        
        .contact-btn.email {
            background: #eff6ff;
            color: #1e40af;
        }
        
        .contact-btn.email:hover {
            background: #dbeafe;
        }
        
        .contact-btn.phone {
            background: #f0fdf4;
            color: #15803d;
        }
        
        .contact-btn.phone:hover {
            background: #dcfce7;
        }
        
        @media (max-width: 768px) {
            #chat-modal {
                bottom: 80px;
                right: 10px;
                left: 10px;
                width: auto;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    document.body.appendChild(modal);
}

// Modal controls
function openChatModal() {
    const modal = document.getElementById('chat-modal');
    if (modal) {
        modal.style.display = 'block';
        // Hide badge when opened
        const badge = document.querySelector('#live-chat-btn .chat-badge');
        if (badge) badge.style.display = 'none';
    }
}

function closeChatModal() {
    const modal = document.getElementById('chat-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Handle quick action selections
function selectQuery(queryType) {
    const responses = {
        'application-status': {
            title: 'Track Your Application',
            message: 'You can check your application status on the "Track Application" page. Just enter your booking number and email address.',
            link: 'track-application.html'
        },
        'visa-requirements': {
            title: 'Visa Requirements',
            message: 'Required documents include: Valid passport (6+ months), passport photo, flight booking, hotel reservation, and bank statement.',
            link: 'help-center.html'
        },
        'payment-issue': {
            title: 'Payment Support',
            message: `We accept credit cards, debit cards, and cryptocurrency. If you're experiencing payment issues, please email us at ${SUPPORT_EMAIL}`,
            link: 'payment-gateway.html'
        },
        'document-upload': {
            title: 'Document Upload Help',
            message: 'Supported formats: JPG, PNG, PDF. Maximum file size: 5MB. Make sure your documents are clear and readable.',
            link: 'document-upload.html'
        }
    };
    
    const response = responses[queryType];
    if (response) {
        const chatBody = document.querySelector('.chat-body');
        const newMessage = document.createElement('div');
        newMessage.className = 'chat-message bot';
        newMessage.innerHTML = `
            <div class="message-content">
                <p><strong>${response.title}</strong></p>
                <p>${response.message}</p>
                ${response.link ? `<p><a href="${response.link}" style="color: #667eea; text-decoration: underline;">Learn more →</a></p>` : ''}
            </div>
            <span class="message-time">Just now</span>
        `;
        chatBody.appendChild(newMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

// Initialize all support features
function initializeCustomerSupport() {
    // Create chat modal
    createChatModal();
    
    // Create live chat button
    createLiveChatButton();
    
    // Create WhatsApp button
    createWhatsAppButton();
    
    // You can enable Tawk.to when you have credentials
    // initializeTawkTo();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCustomerSupport);
} else {
    initializeCustomerSupport();
}
