# 🚀 Deploy Thailand E-Visa Portal to GitHub Pages

## Step-by-Step Guide to Host Your Website on GitHub.io

---

## 📋 Prerequisites

- ✅ Git installed on your computer
- ✅ GitHub account (create one at github.com if you don't have)
- ✅ Your website files ready

---

## 🎯 OPTION 1: Using Git Command Line (Recommended)

### Step 1: Install Git (if not installed)
Download from: https://git-scm.com/downloads

Check if installed:
```bash
git --version
```

### Step 2: Configure Git (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### Step 3: Create GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon (top right) → **"New repository"**
3. Repository name: `thailand-evisa` (or any name you like)
4. Description: "Thailand E-Visa Application Portal"
5. Make it **Public** (required for free GitHub Pages)
6. ✅ **DO NOT** check "Add a README file"
7. Click **"Create repository"**

### Step 4: Initialize Git in Your Project

Open PowerShell/Terminal in your project folder and run:

```bash
# Navigate to your project folder
cd C:\Users\kings\OneDrive\Desktop\l-visa

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Thailand E-Visa Portal"

# Add your GitHub repository as remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/thailand-evisa.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important:** Replace `YOUR-USERNAME` with your actual GitHub username!

Example:
```bash
git remote add origin https://github.com/johndoe/thailand-evisa.git
```

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR-USERNAME/thailand-evisa`
2. Click **"Settings"** (tab at top)
3. Scroll down to **"Pages"** (left sidebar)
4. Under "Source", select **"main"** branch
5. Click **"Save"**
6. Wait 1-2 minutes

Your site will be live at:
```
https://YOUR-USERNAME.github.io/thailand-evisa/
```

---

## 🎯 OPTION 2: Using GitHub Desktop (Easier for Beginners)

### Step 1: Install GitHub Desktop
Download from: https://desktop.github.com/

### Step 2: Sign in to GitHub
- Open GitHub Desktop
- File → Options → Sign in with GitHub account

### Step 3: Create Repository
1. File → New Repository
2. Name: `thailand-evisa`
3. Local Path: `C:\Users\kings\OneDrive\Desktop\l-visa`
4. Click **"Create Repository"**

### Step 4: Copy Your Files
- Copy all your website files to the repository folder
- GitHub Desktop will show all files

### Step 5: Commit and Publish
1. Add commit message: "Initial commit - Thailand E-Visa Portal"
2. Click **"Commit to main"**
3. Click **"Publish repository"**
4. ✅ Make sure **"Keep this code private"** is UNCHECKED (must be public for free Pages)
5. Click **"Publish Repository"**

### Step 6: Enable GitHub Pages
(Same as Option 1, Step 5 above)

---

## 🎯 OPTION 3: Upload Files Directly (Quickest)

### Step 1: Create Repository on GitHub
1. Go to https://github.com
2. Click **"New"** or **"+"** → **"New repository"**
3. Name: `thailand-evisa`
4. Make it **Public**
5. Click **"Create repository"**

### Step 2: Upload Files
1. On repository page, click **"uploading an existing file"**
2. **Drag and drop** all your website files
   - Or click "choose your files" and select all
3. Add commit message: "Initial upload"
4. Click **"Commit changes"**

### Step 3: Enable GitHub Pages
(Same as Option 1, Step 5 above)

---

## 📝 Important Files Configuration

### Create `.gitignore` File
Create a file named `.gitignore` in your project root:

```
# Node modules (if you add backend later)
node_modules/
backend/node_modules/

# Environment variables
.env
*.env

# OS files
.DS_Store
Thumbs.db
desktop.ini

# IDE files
.vscode/
.idea/

# Logs
*.log
logs/

# Temporary files
*.tmp
*.temp
```

### Update Your Landing Page

Rename `login.html` to `index.html` OR create a new `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thailand E-Visa Portal - Home</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 60px 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 600px;
        }
        .flag {
            width: 120px;
            height: 80px;
            background: linear-gradient(to bottom, #ed1c24 0%, #ed1c24 33.33%, white 33.33%, white 66.66%, #241d4f 66.66%, #241d4f 100%);
            border-radius: 10px;
            margin: 0 auto 30px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        h1 {
            color: #1a237e;
            margin-bottom: 15px;
            font-size: 32px;
        }
        p {
            color: #666;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .btn {
            padding: 15px 40px;
            margin: 10px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s;
        }
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(102,126,234,0.4);
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102,126,234,0.6);
        }
        .btn-secondary {
            background: #10B981;
            color: white;
        }
        .btn-secondary:hover {
            background: #059669;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="flag"></div>
        <h1>🇹🇭 Thailand E-Visa Portal</h1>
        <p>Welcome to the official Thailand E-Visa application system. Apply for your Thailand visa online quickly and securely.</p>
        
        <a href="login.html" class="btn btn-primary">
            <i class="fas fa-sign-in-alt"></i> Login
        </a>
        <a href="register.html" class="btn btn-secondary">
            <i class="fas fa-user-plus"></i> Register
        </a>
        
        <div style="margin-top: 30px;">
            <a href="public-landing.html" style="color: #667eea; text-decoration: none;">
                View Public Application Status Board →
            </a>
        </div>
    </div>
</body>
</html>
```

---

## 🔧 After Deployment - Update Files

If you need to update your website after initial deployment:

### Using Git Command Line:
```bash
# Make your changes to files, then:
git add .
git commit -m "Updated features and fixes"
git push
```

### Using GitHub Desktop:
1. Make changes to your files
2. GitHub Desktop will show changes
3. Add commit message
4. Click "Commit to main"
5. Click "Push origin"

### Using GitHub Website:
1. Go to your repository
2. Click on file you want to edit
3. Click pencil icon (Edit)
4. Make changes
5. Scroll down, add commit message
6. Click "Commit changes"

**Changes go live in 1-2 minutes!**

---

## 🌐 Your Live Website URLs

After deployment, your website will be accessible at:

**Main Site:**
```
https://YOUR-USERNAME.github.io/thailand-evisa/
```

**Specific Pages:**
```
https://YOUR-USERNAME.github.io/thailand-evisa/login.html
https://YOUR-USERNAME.github.io/thailand-evisa/register.html
https://YOUR-USERNAME.github.io/thailand-evisa/user-dashboard.html
```

---

## ⚠️ Important Notes

### 1. Backend Limitation
- GitHub Pages only hosts **static files** (HTML, CSS, JS)
- Your backend (Node.js/MongoDB) **CANNOT** run on GitHub Pages
- For backend, you need:
  - **Heroku** (free tier available)
  - **Railway** (free tier available)
  - **Render** (free tier available)
  - **Vercel** (free)
  - **Netlify** (free)

### 2. Demo Mode
- Website will work in **"Demo Mode"** (localStorage only)
- To connect backend, deploy backend separately and update API URLs

### 3. Custom Domain (Optional)
You can use your own domain:
1. Buy domain from Namecheap, GoDaddy, etc.
2. In repository Settings → Pages → Custom domain
3. Enter your domain (e.g., `thailandevisa.com`)
4. Update DNS records at your domain registrar

---

## 🎯 Quick Commands Reference

```bash
# Clone your repository
git clone https://github.com/YOUR-USERNAME/thailand-evisa.git

# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes
git pull

# View remote URL
git remote -v
```

---

## 🚀 Alternative Hosting Options

If GitHub Pages limitations are an issue:

### 1. **Netlify** (Recommended for Full-Stack)
- Free tier available
- Can deploy backend (Node.js)
- Automatic HTTPS
- Custom domains
- Deploy: https://netlify.com

### 2. **Vercel**
- Free tier available
- Great for Node.js backend
- Auto-deploy from GitHub
- Deploy: https://vercel.com

### 3. **Heroku**
- Free tier (with sleep mode)
- Full backend support
- Database hosting
- Deploy: https://heroku.com

### 4. **Railway**
- Free tier ($5 credit/month)
- Backend + Database
- Very easy to use
- Deploy: https://railway.app

---

## 📞 Need Help?

Common Issues:

**404 Error on GitHub Pages**
- Wait 2-3 minutes after enabling Pages
- Make sure repository is **Public**
- Check if `index.html` exists

**Changes Not Showing**
- Clear browser cache (Ctrl + Shift + R)
- Wait 1-2 minutes for GitHub to rebuild
- Check if you pushed to correct branch

**Backend Not Working**
- GitHub Pages = static only
- Deploy backend separately
- Update API URLs in your frontend code

---

## ✅ Final Checklist

Before deploying:
- [ ] Create `index.html` as landing page
- [ ] Add `.gitignore` file
- [ ] Test all pages locally
- [ ] Remove any sensitive data (passwords, API keys)
- [ ] Update README.md with project info
- [ ] Add `styles-fixes.css` link to all pages
- [ ] Add `utils.js` script to all pages

After deploying:
- [ ] Test live website
- [ ] Check all navigation links work
- [ ] Test on mobile device
- [ ] Share link with others for testing
- [ ] Monitor for any errors

---

## 🎉 You're Ready to Deploy!

Follow the steps above and your website will be live on the internet in minutes!

**Your URL will be:** `https://YOUR-USERNAME.github.io/thailand-evisa/`

Good luck! 🚀
