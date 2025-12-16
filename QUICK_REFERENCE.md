# 🚀 Thailand E-Visa - Quick Reference Card

## ⚡ Quick Start (After MongoDB Setup)

```bash
# 1. Navigate to backend
cd C:\Users\kings\l-visa\backend

# 2. Start server
npm run dev

# 3. Open browser
# http://localhost:5000
```

---

## 📊 System Status

| Component | Status | Location |
|-----------|--------|----------|
| Backend Code | ✅ Ready | `C:\Users\kings\l-visa\backend\` |
| Dependencies | ✅ Installed | 180 packages |
| Frontend | ✅ Connected | `login.html`, `register.html` |
| MongoDB | ⏳ **Setup Needed** | See `SETUP_MONGODB.md` |

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Backend API | `http://localhost:5000` |
| Health Check | `http://localhost:5000/api/health` |
| Login Page | `C:\Users\kings\l-visa\login.html` |
| Register Page | `C:\Users\kings\l-visa\register.html` |

---

## 📝 API Endpoints

### Authentication
```
POST   /api/auth/register     - Create account
POST   /api/auth/login        - Login
GET    /api/auth/me           - Get current user (requires token)
```

### Applications
```
GET    /api/applications      - Get my applications
POST   /api/applications      - Create new application
GET    /api/applications/:id  - Get single application
```

### Admin (requires admin role)
```
GET    /api/applications/admin/all    - All applications
GET    /api/applications/admin/stats  - Statistics
```

---

## 🧪 Test User Registration

1. Open: `register.html`
2. Fill form:
   - First Name: John
   - Last Name: Doe
   - Email: john@test.com
   - Phone: +1234567890
   - Nationality: American
   - Passport: A12345678
   - Date of Birth: 1990-01-01
   - Password: password123
3. Submit → redirects to login

---

## 🔐 Test Login

1. Open: `login.html`
2. Enter:
   - Email: john@test.com
   - Password: password123
3. Submit → redirects to dashboard

---

## 📁 Key Files

```
l-visa/
├── backend/
│   ├── .env                    ← Configure this!
│   ├── src/server.js           ← Main server
│   ├── package.json            ← Dependencies
│   └── SETUP_MONGODB.md        ← Database setup guide
├── login.html                  ← Frontend login (updated)
├── register.html               ← Frontend register (updated)
├── COMPLETED_SUMMARY.md        ← Full documentation
└── INSTALLATION_GUIDE.md       ← Setup guide
```

---

## ⚙️ Configuration (.env file)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/thailand-evisa
JWT_SECRET=thailand-evisa-secret-key-2025-secure-random-string-xyz123
```

---

## 🚨 Common Commands

```bash
# Start server (development mode with auto-reload)
npm run dev

# Start server (production mode)
npm start

# Install dependencies (if needed)
npm install

# Check if server is running
curl http://localhost:5000/api/health

# Stop server
Ctrl+C (in terminal where server is running)
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to MongoDB" | Setup MongoDB (see `SETUP_MONGODB.md`) |
| "Port 5000 already in use" | Change PORT in `.env` or stop other process |
| "Module not found" | Run `npm install` in backend folder |
| "CORS error" | Already fixed! Make sure backend is running |
| Login not working | 1. Is backend running? 2. Did you register first? |

---

## 📞 Support Files

| File | Purpose |
|------|---------|
| `COMPLETED_SUMMARY.md` | Complete overview of system |
| `INSTALLATION_GUIDE.md` | Detailed setup instructions |
| `backend/README.md` | API documentation |
| `backend/SETUP_MONGODB.md` | Database setup guide |

---

## 🎯 Next Steps Checklist

- [ ] Setup MongoDB (Option A: Atlas or Option B: Local)
- [ ] Start backend server (`npm run dev`)
- [ ] Test registration page
- [ ] Test login page
- [ ] Create admin user (manually in database)
- [ ] Test file uploads
- [ ] Configure email settings (optional)
- [ ] Add payment gateway (optional)

---

## 💡 Pro Tips

1. **Use MongoDB Atlas** (Cloud) - easier and free forever
2. **Keep terminal open** where server is running to see logs
3. **Check browser console** for frontend errors (F12)
4. **Use Postman** to test API endpoints directly
5. **Create admin user** in database to access admin features

---

## 🔒 Security Notes

- JWT tokens expire in 7 days
- Passwords are hashed with bcrypt
- Max file upload: 5MB
- Allowed file types: PDF, JPG, PNG
- CORS enabled for localhost

---

## 📊 Database Collections

Once MongoDB is running, you'll have:

```
thailand-evisa (database)
├── users           ← User accounts
├── applications    ← Visa applications
└── payments        ← Payment records (future)
```

---

## 🌟 Features Available

✅ User registration & login  
✅ JWT authentication  
✅ Application CRUD  
✅ File uploads  
✅ Admin dashboard APIs  
✅ Email notifications (configured)  
✅ Role-based access  
✅ Application tracking  
✅ Document management  

---

## 🚀 Ready to Start?

```bash
# Step 1: Setup MongoDB
# Read: backend/SETUP_MONGODB.md

# Step 2: Start server
cd C:\Users\kings\l-visa\backend
npm run dev

# Step 3: Test it!
# Open login.html in browser
```

---

**Quick Help:** Open `COMPLETED_SUMMARY.md` for detailed documentation!

**Version:** 1.0.0  
**Last Updated:** December 16, 2025  
🇹🇭 **Thailand E-Visa Portal**
