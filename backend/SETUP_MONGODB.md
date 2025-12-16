# MongoDB Setup Options

## ❌ Current Issue
MongoDB is not running on your computer. You have 3 options:

---

## Option 1: Install MongoDB Locally (Windows)

### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Choose: **Windows** → **MSI Installer**
3. Download the installer

### Step 2: Install
1. Run the downloaded `.msi` file
2. Choose **Complete** installation
3. ✅ Check "Install MongoDB as a Service"
4. ✅ Check "Install MongoDB Compass" (GUI tool)
5. Click Install

### Step 3: Verify
Open Command Prompt:
```bash
mongod --version
```

### Step 4: Start MongoDB Service
```bash
net start MongoDB
```

### Step 5: Restart Backend
```bash
cd C:\Users\kings\l-visa\backend
npm run dev
```

---

## Option 2: MongoDB Atlas (Cloud - RECOMMENDED) ⭐

### Advantages:
- ✅ No local installation needed
- ✅ Free forever (512MB storage)
- ✅ Works anywhere with internet
- ✅ Automatic backups
- ✅ Ready for production

### Setup Steps:

#### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google/GitHub or Email
3. Choose **FREE** tier (M0 Sandbox)

#### Step 2: Create Cluster
1. Choose **AWS** or **Google Cloud**
2. Select closest region (e.g., US East or Asia)
3. Click "Create Cluster" (takes 3-5 minutes)

#### Step 3: Create Database User
1. Go to **Database Access** (left menu)
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `evisa-admin`
5. Password: Create a strong password (save it!)
6. User Privileges: **Atlas Admin**
7. Click **Add User**

#### Step 4: Whitelist Your IP
1. Go to **Network Access** (left menu)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (for development)
4. Confirm

#### Step 5: Get Connection String
1. Click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy the connection string:
   ```
   mongodb+srv://evisa-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password

#### Step 6: Update .env File
Open `backend\.env` and update:
```env
MONGODB_URI=mongodb+srv://evisa-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/thailand-evisa?retryWrites=true&w=majority
```

#### Step 7: Restart Backend
```bash
cd C:\Users\kings\l-visa\backend
npm run dev
```

You should see: ✅ MongoDB Connected!

---

## Option 3: Use Docker MongoDB

If you have Docker installed:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Then restart backend:
```bash
cd C:\Users\kings\l-visa\backend
npm run dev
```

---

## 🎯 Recommended: Option 2 (MongoDB Atlas)

**Why?**
- ✅ Works immediately
- ✅ No installation needed
- ✅ Free forever
- ✅ Production-ready
- ✅ Automatic scaling

**Setup time:** 5-10 minutes

---

## 📞 Need Help?

### Check if MongoDB is Running (Local)
```bash
# Windows
net start | findstr MongoDB

# Or check services
services.msc
# Look for "MongoDB Server"
```

### Test MongoDB Connection
```bash
# If local MongoDB is running
mongosh
# Or
mongo
```

### Common Errors

**Error: ECONNREFUSED 127.0.0.1:27017**
- Solution: MongoDB service is not running. Use Option 1 or 2 above.

**Error: Authentication failed**
- Solution: Check username/password in connection string

**Error: Network timeout**
- Solution: Check Network Access whitelist in MongoDB Atlas

---

## ✅ Quick Test

After setup, test the API:

```bash
# In browser, go to:
http://localhost:5000

# Or in PowerShell:
curl http://localhost:5000/api/health
```

You should see server response!

---

**For fastest setup: Use MongoDB Atlas (Option 2)** ⚡
