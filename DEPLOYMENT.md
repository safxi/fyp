# Deployment Guide

This guide will help you deploy your AI-Enabled Judiciary & Court Case Management System to free hosting platforms.

## Prerequisites

- ✅ MongoDB Atlas account (free tier)
- ✅ GitHub account
- ✅ Render account (free tier) - for backend
- ✅ Vercel account (free tier) - for frontend

---

## Step 1: Push Code to GitHub

### 1.1 Initialize Git Repository

```bash
cd "C:\Users\SAIF\OneDrive\Desktop\zabi fyp"
git init
git add .
git commit -m "Initial commit - AI Judiciary CMS"
```

### 1.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (e.g., `ai-judiciary-cms`)
3. **DO NOT** initialize with README (you already have code)

### 1.3 Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-judiciary-cms.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (free tier)

### 2.2 Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your repository (`ai-judiciary-cms`)

### 2.3 Configure Backend Service

**Settings:**
- **Name**: `ai-judiciary-backend` (or any name)
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free`

### 2.4 Add Environment Variables

Click **"Environment"** tab and add:

```
MONGO_URI=mongodb+srv://su6830002_db_user:4rJtXfeoUHN45Jvv@cluster0.vrlxvgu.mongodb.net/ai_judiciary?retryWrites=true&w=majority
JWT_SECRET=your_strong_secret_here_change_this
JWT_REFRESH_SECRET=your_strong_refresh_secret_here_change_this
PORT=5000
NODE_ENV=production
```

**⚠️ Important:** Replace `your_strong_secret_here_change_this` with actual strong random strings!

### 2.5 Deploy

Click **"Create Web Service"**. Render will:
- Install dependencies
- Build your app
- Start the server

**Wait for deployment** (takes 2-5 minutes). You'll get a URL like:
```
https://ai-judiciary-backend.onrender.com
```

**Save this URL** - you'll need it for the frontend!

### 2.6 Test Backend

Open: `https://your-backend-url.onrender.com/api/health`

Should return: `{ "status": "ok" }`

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub (free tier)

### 3.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Select your repository

### 3.3 Configure Frontend

**Settings:**
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)

### 3.4 Add Environment Variable

Click **"Environment Variables"** and add:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

**Replace** `your-backend-url.onrender.com` with your actual Render backend URL!

### 3.5 Deploy

Click **"Deploy"**. Vercel will:
- Install dependencies
- Build your React app
- Deploy to CDN

**Wait for deployment** (takes 1-3 minutes). You'll get a URL like:
```
https://ai-judiciary-cms.vercel.app
```

---

## Step 4: Create Admin User

After deployment, create an admin user:

### Option A: Using Render Shell (Recommended)

1. Go to your Render dashboard
2. Click on your backend service
3. Click **"Shell"** tab
4. Run:

```bash
cd backend
npm run create-admin admin@judiciary.com admin123 "System Admin"
```

### Option B: Using MongoDB Atlas

1. Go to MongoDB Atlas → Collections
2. Find your `users` collection
3. Insert a document:

```json
{
  "name": "System Admin",
  "email": "admin@judiciary.com",
  "passwordHash": "$2a$10$...", // Use bcrypt hash of "admin123"
  "role": "ADMIN",
  "status": "APPROVED"
}
```

**Easier:** Use Option A (Render Shell) or run the script locally pointing to your Atlas DB.

---

## Step 5: Test Your Deployed App

1. **Open your Vercel frontend URL** (e.g., `https://ai-judiciary-cms.vercel.app`)
2. **Register a new user** (will be PENDING)
3. **Log in as admin** (`admin@judiciary.com` / `admin123`)
4. **Go to Admin → Pending User Approvals**
5. **Approve your test user**
6. **Log out and log in as the approved user**
7. **Test all features**: Cases, Hearings, AI Drafting, etc.

---

## Troubleshooting

### Backend Issues

- **"Cannot GET /"**: Normal - backend only serves `/api/*` routes
- **MongoDB connection error**: Check `MONGO_URI` in Render environment variables
- **Port error**: Render sets `PORT` automatically, don't override it

### Frontend Issues

- **API calls failing**: Check `VITE_API_URL` in Vercel environment variables
- **CORS errors**: Backend CORS is already configured for all origins
- **404 on refresh**: Vercel handles this automatically with Vite

### Common Fixes

1. **Redeploy** after changing environment variables
2. **Check logs** in Render/Vercel dashboards
3. **Verify MongoDB Atlas** network access allows `0.0.0.0/0` (for testing)

---

## Free Tier Limitations

- **Render**: Sleeps after 15 minutes of inactivity (first request wakes it up)
- **Vercel**: 100GB bandwidth/month (plenty for FYP demos)
- **MongoDB Atlas**: 512MB storage (enough for testing)

---

## Next Steps

- ✅ Your app is now live!
- 🔒 Change admin password after first login
- 📝 Add more test data (cases, hearings, etc.)
- 🎨 Customize UI/colors if needed
- 📊 Monitor usage in Render/Vercel dashboards

---

## Support

If you encounter issues:
1. Check Render/Vercel deployment logs
2. Verify environment variables are set correctly
3. Test backend API directly (e.g., `/api/health`)
4. Check MongoDB Atlas connection status

Good luck with your FYP! 🎓

