# Thailand E-Visa Backend API

Complete backend API server for Thailand Electronic Visa Application Portal.

## 🚀 Features

- ✅ User Authentication (Register, Login, JWT)
- ✅ Visa Application Management (CRUD)
- ✅ File Upload System (Documents, Photos)
- ✅ Admin Dashboard API
- ✅ Email Notifications
- ✅ Payment Integration Ready
- ✅ Application Tracking
- ✅ Role-Based Access Control (User, Admin, Manager)

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Edit the `.env` file and update with your credentials:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/thailand-evisa

# JWT Secret (Change this!)
JWT_SECRET=your-super-secret-key-here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### 3. Install MongoDB

**Option A: Local MongoDB**
- Download: https://www.mongodb.com/try/download/community
- Install and run MongoDB service

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Sign up at: https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string
- Update `MONGODB_URI` in `.env`

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run at: `http://localhost:5000`

## 📚 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/me` | Get current user | Yes |
| PUT | `/profile` | Update profile | Yes |
| PUT | `/change-password` | Change password | Yes |

### Applications (`/api/applications`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get my applications | Yes |
| POST | `/` | Create application | Yes |
| GET | `/:id` | Get single application | Yes |
| PUT | `/:id` | Update application | Yes |
| DELETE | `/:id` | Delete application | Yes |
| PUT | `/:id/submit` | Submit application | Yes |
| GET | `/booking/:bookingNumber` | Track by booking number | No |
| GET | `/admin/all` | Get all applications | Admin |
| GET | `/admin/stats` | Get statistics | Admin |
| PUT | `/:id/status` | Update status | Admin |

### File Upload (`/api/upload`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/:applicationId` | Upload document | Yes |
| GET | `/:applicationId/:documentId` | Get document | Yes |
| DELETE | `/:applicationId/:documentId` | Delete document | Yes |
| POST | `/profile-photo` | Upload profile photo | Yes |

## 🔐 Authentication

All protected routes require JWT token in the header:

```javascript
headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

## 📝 Example API Usage

### 1. Register User

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890",
    "nationality": "American",
    "dateOfBirth": "1990-01-01",
    "passportNumber": "A12345678"
}
```

### 2. Login

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}
```

Response:
```json
{
    "success": true,
    "data": {
        "user": {
            "id": "...",
            "fullName": "John Doe",
            "email": "john@example.com",
            "role": "user"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

### 3. Create Application

```bash
POST http://localhost:5000/api/applications
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
    "visaType": "Tourist Visa (TR)",
    "entryType": "Single Entry",
    "duration": "60 Days",
    "purposeOfVisit": "Tourism",
    "intendedArrivalDate": "2025-01-15",
    "passportIssueDate": "2020-01-01",
    "passportExpiryDate": "2030-01-01",
    "submittedTo": "Royal Thai Consulate General, Los Angeles"
}
```

### 4. Upload Document

```bash
POST http://localhost:5000/api/upload/{applicationId}
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data

document: [file]
documentType: "Passport Copy"
```

### 5. Track Application (Public)

```bash
GET http://localhost:5000/api/applications/booking/TH-2025-1001
```

## 📊 Database Schema

### User
```javascript
{
    fullName: String,
    email: String (unique),
    password: String (hashed),
    phone: String,
    nationality: String,
    dateOfBirth: Date,
    passportNumber: String (unique),
    role: String (user/admin/manager),
    profilePhoto: String
}
```

### Application
```javascript
{
    bookingNumber: String (auto-generated),
    userId: ObjectId (ref: User),
    fullName: String,
    email: String,
    visaType: String,
    entryType: String,
    status: String,
    documents: Array,
    paymentStatus: String,
    timeline: Array,
    adminNotes: Array
}
```

## 🔧 Testing with Postman

1. Import the API endpoints into Postman
2. Create an environment with:
   - `base_url`: http://localhost:5000
   - `token`: (will be set after login)
3. Test endpoints sequentially:
   - Register → Login → Create Application → Upload Documents

## 🚨 Troubleshooting

### MongoDB Connection Error
```
Solution: 
1. Check if MongoDB is running
2. Verify MONGODB_URI in .env
3. Check MongoDB service status
```

### Port Already in Use
```
Solution:
Change PORT in .env to different number (e.g., 5001)
```

### Email Not Sending
```
Solution:
1. Use Gmail App Password (not regular password)
2. Enable "Less secure app access" or use OAuth2
3. Check EMAIL_HOST and EMAIL_PORT settings
```

## 📦 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── applicationController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── upload.js            # File upload config
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Application.js       # Application schema
│   │   └── Payment.js           # Payment schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── applicationRoutes.js
│   │   └── uploadRoutes.js
│   ├── utils/
│   │   └── emailService.js      # Email templates
│   └── server.js                # Main server file
├── uploads/                     # Uploaded files
│   ├── photos/
│   ├── passports/
│   └── documents/
├── .env                         # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🔒 Security Notes

1. **Change JWT_SECRET** in production
2. **Never commit .env** file
3. Use **strong passwords** for admin accounts
4. Enable **HTTPS** in production
5. Implement **rate limiting** for API endpoints
6. Validate and sanitize **all inputs**

## 📈 Next Steps

1. ✅ Backend API is complete
2. 🔄 Connect frontend HTML pages to API
3. 🔄 Add payment gateway integration (Stripe/PayPal)
4. 🔄 Add PDF generation for visa certificates
5. 🔄 Deploy to cloud (AWS, Heroku, DigitalOcean)

## 💡 Tips

- Use MongoDB Compass to visualize your database
- Use Postman to test all API endpoints
- Check server logs for debugging
- Keep .env file secure

## 📞 Support

For issues or questions, check the logs in the console or contact the development team.

---

**Made with ❤️ for Thailand E-Visa Portal**
