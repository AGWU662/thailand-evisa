# Customer Chat Support Setup Guide

## Overview
Your Thailand E-Visa Portal now includes a comprehensive customer support system with:
- 💬 **Live Chat Modal** - Interactive chat with quick actions
- 💚 **WhatsApp Integration** - Direct messaging support
- 📧 **Email Support** - Direct email links
- 📞 **Phone Support** - Click-to-call functionality

## 🚀 Quick Start

### Step 1: Configure Contact Information
Open `chat-support.js` and update these values at the top of the file:

```javascript
// Current (placeholder values)
const WHATSAPP_NUMBER = '66123456789';
const SUPPORT_EMAIL = 'support@thailand-evisa.com';
const SUPPORT_PHONE = '+66123456789';

// Change to your actual values:
const WHATSAPP_NUMBER = '66812345678'; // Your WhatsApp Business number
const SUPPORT_EMAIL = 'contact@yourdomain.com'; // Your support email
const SUPPORT_PHONE = '+6681234567'; // Your support phone
```

**WhatsApp Number Format:** Country code + number without spaces or special characters
- Example: Thailand number 081-234-5678 → `66812345678`

### Step 2: Test the Features
1. Open any page in your browser (index.html, login.html, etc.)
2. Look for the floating buttons at the bottom right:
   - 💬 Purple circular button = Live Chat
   - 💚 Green button = WhatsApp Support
3. Click the chat button and test the quick actions
4. Click WhatsApp button to verify it opens correctly

### Step 3: Customize Messages (Optional)
You can customize the chat messages in `chat-support.js`:

**Welcome Message** (around line 205):
```javascript
<p>👋 Hello! Welcome to Thailand E-Visa Portal support.</p>
<p>How can we help you today?</p>
```

**Quick Action Responses** (around line 478):
```javascript
const responses = {
    'application-status': {
        title: 'Track Your Application',
        message: 'You can check your application status...',
        link: 'track-application.html'
    },
    // ... customize other responses
};
```

## 🎯 Features Included

### Live Chat Modal
- **Quick Actions:**
  - 📋 Check Application Status
  - 📄 Visa Requirements
  - 💳 Payment Issues
  - 📎 Document Upload Help
  
- **Contact Options:**
  - Email button (opens email client)
  - Call button (click-to-call on mobile)
  
- **Status Indicator:**
  - Shows "We're online" with animated dot
  
### WhatsApp Button
- Pre-filled message: "Hello, I need help with my Thailand e-visa application"
- Opens in new tab
- Mobile-responsive (icon only on small screens)

### Design Features
- Smooth animations and transitions
- Mobile-responsive layout
- Matches your site's color scheme (purple gradient)
- Professional and modern UI
- Floating buttons that don't interfere with content

## 🔧 Advanced Configuration

### Option 1: Add Tawk.to Live Agent Chat
If you want real-time chat with human agents:

1. Sign up for free at [Tawk.to](https://www.tawk.to/)
2. Create a widget and get your Property ID and Widget ID
3. In `chat-support.js`, find the `initializeTawkTo()` function (around line 24)
4. Update the script URL:
   ```javascript
   s1.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
   ```
5. Uncomment this line (around line 538):
   ```javascript
   // initializeTawkTo(); // Remove the //
   ```

**Note:** Tawk.to will replace the built-in chat modal with their widget.

### Option 2: Customize Chat Appearance
Edit the CSS styles in `chat-support.js`:

**Change Chat Button Color** (around line 131):
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Change WhatsApp Button Position** (around line 57):
```css
bottom: 80px;
right: 20px;
```

### Option 3: Remove Features
If you only want certain features:

**To disable WhatsApp:**
```javascript
// Comment out in initializeCustomerSupport() function (around line 534)
// createWhatsAppButton();
```

**To disable Live Chat:**
```javascript
// Comment out in initializeCustomerSupport() function (around line 531)
// createLiveChatButton();
```

## 📱 Mobile Optimization
The chat system is fully responsive:
- Chat modal adjusts to screen size
- WhatsApp button shows icon only on mobile
- Touch-friendly button sizes
- Optimized animations for mobile devices

## 🌍 Multi-Language Support (Future)
To add multi-language support:
1. Store messages in language objects
2. Add language selector
3. Update messages based on user selection

Example structure:
```javascript
const messages = {
    en: {
        welcome: "Hello! How can we help?",
        // ...
    },
    th: {
        welcome: "สวัสดี! เราจะช่วยอะไรได้บ้าง?",
        // ...
    }
};
```

## 🎨 Customization Ideas

### Add More Quick Actions
In the `createChatModal()` function, add more buttons:
```javascript
<button onclick="selectQuery('new-action')">
    🎯 Your New Action
</button>
```

Then add the response in `selectQuery()` function:
```javascript
'new-action': {
    title: 'Your Title',
    message: 'Your message here',
    link: 'your-page.html'
}
```

### Change Colors
Update the gradient in CSS sections:
- Main chat button: Line ~131
- Chat header: Line ~164
- WhatsApp button: Line ~55

### Add Social Media Links
You can add more social buttons similar to WhatsApp:
- Facebook Messenger
- Telegram
- Line (popular in Thailand)
- Twitter/X

## ⚠️ Important Notes

1. **Email Configuration:** The `mailto:` links will open the user's email client. Make sure your support email can receive messages.

2. **Phone Numbers:** Click-to-call works best on mobile devices. Desktop users will need a phone app installed.

3. **WhatsApp Business:** For best results, use a WhatsApp Business account instead of personal WhatsApp.

4. **Testing:** Always test on multiple devices (desktop, mobile, tablet) before going live.

5. **Spam Protection:** Consider adding rate limiting if you get too many support requests.

## 🆘 Troubleshooting

**Chat button not appearing:**
- Check browser console for errors
- Verify `chat-support.js` is loaded
- Check if Font Awesome icons are loading

**WhatsApp link not working:**
- Verify phone number format (no spaces, no +)
- Test on mobile device
- Make sure WhatsApp is installed

**Styles look broken:**
- Clear browser cache
- Check for CSS conflicts
- Verify Font Awesome CSS is loaded

## 📞 Support

If you need help setting this up:
1. Check the browser console for error messages
2. Verify all placeholder values are updated
3. Test on different browsers
4. Review the comments in `chat-support.js`

## ✅ Checklist Before Going Live

- [ ] Updated WhatsApp number
- [ ] Updated support email
- [ ] Updated support phone number
- [ ] Tested chat modal on desktop
- [ ] Tested chat modal on mobile
- [ ] Tested WhatsApp button
- [ ] Tested email link
- [ ] Tested phone link
- [ ] Customized welcome message (optional)
- [ ] Customized quick action responses (optional)
- [ ] Added Tawk.to integration (optional)

---

**Need More Help?** Check the comments in `chat-support.js` for detailed technical information.
