/**
 * Thailand E-Visa Portal - Utility Functions
 * Security, Validation, and Helper Functions
 */

// ===== SECURITY FUNCTIONS =====

/**
 * Sanitize user input to prevent XSS attacks
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    
    return input.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Simple password hashing (for demo - use bcrypt in production)
 */
function hashPassword(password) {
    // This is NOT secure - use bcrypt in production
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
}

/**
 * Check password strength
 */
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
}

/**
 * Generate secure random token
 */
function generateToken(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

// ===== VALIDATION FUNCTIONS =====

/**
 * Validate email address
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validate phone number (international format)
 */
function validatePhone(phone) {
    const regex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return regex.test(phone);
}

/**
 * Validate passport number
 */
function validatePassport(passport) {
    // Basic validation - alphanumeric, 6-9 characters
    const regex = /^[A-Z0-9]{6,9}$/i;
    return regex.test(passport);
}

/**
 * Validate date is in future
 */
function isFutureDate(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate >= today;
}

/**
 * Check if passport is valid (6 months minimum)
 */
function isPassportValid(expiryDate) {
    const expiry = new Date(expiryDate);
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    return expiry >= sixMonthsFromNow;
}

/**
 * Calculate age from date of birth
 */
function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// ===== UI HELPER FUNCTIONS =====

/**
 * Show loading overlay
 */
function showLoading(message = 'Loading...') {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = `
        <div class="loading-spinner"></div>
        <p style="font-size: 18px; margin-top: 10px;">${message}</p>
    `;
    document.body.appendChild(overlay);
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    }[type] || 'ℹ️';
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">${icon}</span>
            <div>
                <strong style="display: block; margin-bottom: 5px;">${type.toUpperCase()}</strong>
                <p style="margin: 0; color: #666;">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="margin-left: auto; border: none; background: none; cursor: pointer; font-size: 20px; color: #999;">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

/**
 * Confirm action with custom dialog
 */
function confirmAction(message, onConfirm, onCancel) {
    if (confirm(message)) {
        if (onConfirm) onConfirm();
    } else {
        if (onCancel) onCancel();
    }
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Format date for input fields
 */
function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Format currency
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// ===== DATA MANAGEMENT =====

/**
 * Save data to localStorage safely
 */
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving to localStorage:', e);
        showNotification('Failed to save data. Storage might be full.', 'error');
        return false;
    }
}

/**
 * Load data from localStorage safely
 */
function loadFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return defaultValue;
    }
}

/**
 * Clear all user session data
 */
function clearSession() {
    const keysToRemove = [
        'token',
        'user',
        'userEmail',
        'userRole',
        'isLoggedIn',
        'currentUser',
        'rememberMe'
    ];
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
}

// ===== FILE HANDLING =====

/**
 * Validate file upload
 */
function validateFile(file, maxSizeMB = 5, allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']) {
    const errors = [];
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
        errors.push(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
    }
    
    // Check file size
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
        errors.push(`File too large. Maximum size: ${maxSizeMB}MB`);
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

/**
 * Convert file to base64
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

/**
 * Format file size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ===== FORM HELPERS =====

/**
 * Auto-save form data
 */
function autoSaveForm(formId, storageKey) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Load saved data
    const savedData = loadFromStorage(storageKey);
    if (savedData) {
        Object.keys(savedData).forEach(key => {
            const input = form.elements[key];
            if (input) {
                input.value = savedData[key];
            }
        });
    }
    
    // Save on change
    form.addEventListener('input', debounce(() => {
        const formData = {};
        Array.from(form.elements).forEach(element => {
            if (element.name && element.type !== 'password') {
                formData[element.name] = element.value;
            }
        });
        saveToStorage(storageKey, formData);
        showNotification('Draft saved', 'info', 2000);
    }, 2000));
}

/**
 * Clear form auto-save
 */
function clearAutoSave(storageKey) {
    localStorage.removeItem(storageKey);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== AUTHENTICATION HELPERS =====

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

/**
 * Get current user
 */
function getCurrentUser() {
    return loadFromStorage('currentUser', null);
}

/**
 * Require authentication
 */
function requireAuth(redirectUrl = 'login.html') {
    if (!isLoggedIn()) {
        showNotification('Please login to access this page', 'warning');
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 1500);
        return false;
    }
    return true;
}

/**
 * Require admin role
 */
function requireAdmin(redirectUrl = 'user-dashboard.html') {
    const user = getCurrentUser();
    if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
        showNotification('Access denied. Admin privileges required.', 'error');
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 1500);
        return false;
    }
    return true;
}

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sanitizeInput,
        hashPassword,
        checkPasswordStrength,
        validateEmail,
        validatePhone,
        validatePassport,
        isFutureDate,
        isPassportValid,
        calculateAge,
        showLoading,
        hideLoading,
        showNotification,
        confirmAction,
        formatDate,
        formatCurrency,
        saveToStorage,
        loadFromStorage,
        clearSession,
        validateFile,
        formatFileSize,
        autoSaveForm,
        isLoggedIn,
        getCurrentUser,
        requireAuth,
        requireAdmin
    };
}
