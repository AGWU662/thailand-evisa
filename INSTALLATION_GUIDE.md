# 🚀 Thailand E-Visa Portal - Complete Installation Guide

## 📋 What You Need to Install

### 1. **Node.js & npm** ✅ (Already Installed)
   - Version: v22.21.1
   - npm: 10.9.4

### 2. **MongoDB** (Database)
   Choose ONE option:

   **Option A: MongoDB Local (Windows)**
   1. Download: https://www.mongodb.com/try/download/community
   2. Choose "Windows" → Download MSI installer
   3. Run installer → Complete installation
   4. MongoDB will run as Windows service automatically

   **Option B: MongoDB Atlas (Cloud - Recommended for Beginners)**
   1. Go to: https://www.mongodb.com/cloud/atlas/register
   2. Sign up for free
   3. Create a free cluster (M0 Sandbox)
   4. Wait 3-5 minutes for cluster creation
   5. Click "Connect" → "Connect your application"
   6. Copy connection string
   7. Replace `<password>` in connection string
   8. Update `MONGODB_URI` in `.env` file

---

## 🔧 Step-by-Step Setup

### Step 1: Install Backend Dependencies

```bash
cd C:\Users\kings\l-visa\backend
npm install
```

This will install:
- Express (Web server)
- Mongoose (MongoDB driver)
- JWT (Authentication)
- Multer (File uploads)
- Nodemailer (Email service)
- And more...

**Expected time:** 2-3 minutes

### Step 2: Configure Environment Variables

1. Open `backend\.env` in any text editor
2. Update these settings:

```env
# REQUIRED: Change this to a random string
JWT_SECRET=mysecretkey12345changethis

# DATABASE: Choose one option below

# Option A: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/thailand-evisa

# Option B: MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/thailand-evisa

# EMAIL (Optional - for testing, you can skip this)
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Step 3: Start MongoDB

**If using Local MongoDB:**
```bash
# MongoDB should auto-start as Windows service
# To verify, open services.msc and look for "MongoDB"

# Or start manually:
net start MongoDB
```

**If using MongoDB Atlas:**
- Nothing to do, it's already running in the cloud!

### Step 4: Start the Backend Server

```bash
cd C:\Users\kings\l-visa\backend
npm run dev
```

You should see:
```
╔═══════════════════════════════════════════════════════════╗
║   🇹🇭  THAILAND E-VISA API SERVER                         ║
║   Server running in development mode                      ║
║   Port: 5000                                              ║
╚═══════════════════════════════════════════════════════════╝
✅ MongoDB Connected
```

**Server is now running at:** `http://localhost:5000`

---

## 🧪 Test the Backend API

### Method 1: Using Browser

Open browser and go to:
- http://localhost:5000 (Should show welcome message)
- http://localhost:5000/api/health (Should show health check)

### Method 2: Using PowerShell/CMD

```powershell
# Test health endpoint
curl http://localhost:5000/api/health

# Test register (create user)
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"fullName\":\"John Doe\",\"email\":\"john@test.com\",\"password\":\"password123\",\"phone\":\"+1234567890\",\"nationality\":\"American\",\"dateOfBirth\":\"1990-01-01\",\"passportNumber\":\"A12345678\"}"
```

### Method 3: Using Postman (Recommended)

1. Download Postman: https://www.postman.com/downloads/
2. Install and open Postman
3. Create new request:
   - Method: POST
   - URL: `http://localhost:5000/api/auth/register`
   - Body → raw → JSON:
   ```json
   {
       "fullName": "Test User",
       "email": "test@example.com",
       "password": "password123",
       "phone": "+1234567890",
       "nationality": "American",
       "dateOfBirth": "1990-01-01",
       "passportNumber": "A12345678"
   }
   ```
4. Click "Send"
5. You should get response with token

---

## 🔗 Connect Frontend to Backend

Now you need to update your HTML files to connect to the API:

### Example: Update login.html

Find this section in your HTML files:
```javascript
// OLD CODE (fake login)
function login() {
    if(email === 'admin@thai-evisa.com') {
        window.location.href = 'admin-dashboard.html';
    }
}
```

Replace with:
```javascript
// NEW CODE (real API)
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Save token
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));

            // Redirect based on role
            if (data.data.user.role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'user-dashboard.html';
            }
        } else {
            alert('Login failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please try again.');
    }
}
```

---

## 📁 File Structure After Setup

```
l-visa/
├── backend/                          ✅ NEW
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   ├── uploads/                      (created automatically)
│   ├── node_modules/                 (created after npm install)
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
├── admin-dashboard.html
├── apply-visa.html
├── login.html
├── register.html
└── ... (all other HTML files)
```

---

## 🎯 Default Admin Account

After first user is created, you can manually set them as admin:

### Using MongoDB Compass:
1. Download: https://www.mongodb.com/try/download/compass
2. Connect to your database
3. Go to `thailand-evisa` → `users` collection
4. Find your user
5. Change `role` field from `"user"` to `"admin"`
6. Save

### Using MongoDB Shell:
```javascript
use thailand-evisa
db.users.updateOne(
    { email: "your-email@example.com" },
    { $set: { role: "admin" } }
)
```

---

## 🚨 Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"
**Solution:**
- Check if MongoDB service is running: `net start MongoDB`
- Verify `MONGODB_URI` in `.env`
- If using Atlas, check internet connection and whitelist your IP

### Issue 2: "Port 5000 already in use"
**Solution:**
- Change `PORT` in `.env` to `5001` or `3000`
- Or kill the process using port 5000

### Issue 3: "Module not found"
**Solution:**
```bash
cd backend
npm install
```

### Issue 4: "CORS error in browser"
**Solution:**
Already handled! Backend has CORS enabled.

### Issue 5: "JWT token expired"
**Solution:**
User needs to login again to get a new token.

---

## 📊 Monitor Your Application

### View Database:
**Option 1: MongoDB Compass (GUI)**
- Connection string: Same as in `.env`
- Browse collections, view data, run queries

**Option 2: MongoDB Atlas Dashboard**
- Login to Atlas → View clusters → Collections

### View Server Logs:
- Check your terminal where you ran `npm run dev`
- All requests and errors are logged there

### View Uploaded Files:
- Go to `backend\uploads\` folder
- Files organized by type (photos, passports, documents)

---

## 🎉 You're All Set!

Your backend is now running! Next steps:

1. ✅ Test all API endpoints with Postman
2. 🔄 Update HTML files to use real API
3. 🔄 Test file uploads
4. 🔄 Add payment gateway
5. 🔄 Deploy to production

---

## 📞 Need Help?

If you encounter any issues:

1. Check backend logs in terminal
2. Check browser console for frontend errors
3. Verify MongoDB is running
4. Check `.env` configuration
5. Make sure all ports are available

---

## 🚀 Ready to Deploy?

When ready for production:

1. **Frontend Hosting:** Netlify, Vercel, or GitHub Pages
2. **Backend Hosting:** Heroku, AWS, or DigitalOcean
3. **Database:** MongoDB Atlas (already cloud-ready)

**Deployment guides coming soon!**

---

**Happy Coding! 🇹🇭**
