# 🚀 KhataLens Deployment Guide

## Architecture:
- **Backend**: Railway (Python/FastAPI)
- **Frontend**: Vercel (React/Vite)

---

## 📦 Part 1: Deploy Backend to Railway

### Step 1: Verify Railway Backend is Running

1. **Go to Railway Dashboard**: https://railway.app
2. **Check `khatalens-api` service** is **Online** ✅
3. **Copy the backend URL**: `https://khatalens-api-production.up.railway.app`

### Step 2: Verify Backend Environment Variables

Make sure these are set in Railway → `khatalens-api` → Variables:

```
GOOGLE_API_KEY=AIzaSyCVILfHB8KsgFqZcB4swK9GDzUJ1Yg18Qo
VITE_GOOGLE_API_KEY=AIzaSyCzWhsUZnDovRje50t0dgkmhBcoFGvDucg
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1haXBoeXNxa3NpeXB6aGR1bmppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzA1MjM3NywiZXhwIjoyMDkyNjI4Mzc3fQ.MHLjYqRmw6MSGkAxRiO06nSO9peXSQ_sGzwXUnOVBAk
OPENROUTER_API_KEY=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
```

### Step 3: Test Backend

Visit: `https://khatalens-api-production.up.railway.app/health`

Should return:
```json
{"status":"healthy","database":"sqlite"}
```

✅ **Backend is ready!**

---

## 🌐 Part 2: Deploy Frontend to Vercel

### Method A: Using Vercel Dashboard (Recommended - Easiest)

#### Step 1: Go to Vercel

1. **Visit**: https://vercel.com
2. **Click "Login"** → Sign in with GitHub
3. **Click "Add New"** → **"Project"**

#### Step 2: Import Repository

1. **Click "Import Git Repository"**
2. **Find and select**: `KhataLens` repository
3. **Click "Import"**

#### Step 3: Configure Project

Vercel will auto-detect Vite. Verify these settings:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Root Directory: ./
```

**Click "Deploy"** (Don't add env vars yet)

#### Step 4: Wait for Initial Deployment

- Wait 2-3 minutes for build to complete
- It will fail or show blank page (expected - no env vars yet)

#### Step 5: Add Environment Variables

1. **Go to your project** → **Settings** → **Environment Variables**
2. **Add these 4 variables:**

**Variable 1:**
- Name: `VITE_API_URL`
- Value: `https://khatalens-api-production.up.railway.app`
- Environment: Production, Preview, Development (select all)

**Variable 2:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://maiphysqksiypzhdunji.supabase.co`
- Environment: Production, Preview, Development (select all)

**Variable 3:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1haXBoeXNxa3NpeXB6aGR1bmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTIzNzcsImV4cCI6MjA5MjYyODM3N30.qvwHJKlvCTF4TzMKDi9Em_j55uXCK4HJ-BZmkTURrOc`
- Environment: Production, Preview, Development (select all)

**Variable 4:**
- Name: `VITE_GOOGLE_API_KEY`
- Value: `AIzaSyCzWhsUZnDovRje50t0dgkmhBcoFGvDucg`
- Environment: Production, Preview, Development (select all)

#### Step 6: Redeploy

1. **Go to "Deployments" tab**
2. **Click the three dots** on the latest deployment
3. **Click "Redeploy"**
4. **Wait 2-3 minutes**

#### Step 7: Get Your URL

After deployment completes:
- **Copy your Vercel URL**: `https://khatalens.vercel.app` (or similar)

✅ **Frontend is deployed!**

---

### Method B: Using Vercel CLI (Alternative)

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
cd KhataLens
vercel
```

Follow prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name? **khatalens** (or press Enter)
- Directory? **./** (press Enter)
- Override settings? **No**

#### Step 4: Add Environment Variables

```bash
vercel env add VITE_API_URL production
```
Enter: `https://khatalens-api-production.up.railway.app`

```bash
vercel env add VITE_SUPABASE_URL production
```
Enter: `https://maiphysqksiypzhdunji.supabase.co`

```bash
vercel env add VITE_SUPABASE_ANON_KEY production
```
Enter: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1haXBoeXNxa3NpeXB6aGR1bmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTIzNzcsImV4cCI6MjA5MjYyODM3N30.qvwHJKlvCTF4TzMKDi9Em_j55uXCK4HJ-BZmkTURrOc`

```bash
vercel env add VITE_GOOGLE_API_KEY production
```
Enter: `AIzaSyCzWhsUZnDovRje50t0dgkmhBcoFGvDucg`

#### Step 5: Deploy to Production

```bash
vercel --prod
```

---

## 🔧 Part 3: Configure Google OAuth

### Step 1: Update Google Cloud Console

1. **Go to**: https://console.cloud.google.com/apis/credentials
2. **Select your OAuth 2.0 Client**
3. **Add to Authorized JavaScript origins**:
   ```
   https://khatalens.vercel.app
   ```
   (Replace with your actual Vercel URL)

4. **Add to Authorized redirect URIs**:
   ```
   https://khatalens.vercel.app/auth/callback
   ```

5. **Click "Save"**

### Step 2: Update Supabase

1. **Go to**: https://supabase.com/dashboard
2. **Select your project**: `maiphysqksiypzhdunji`
3. **Go to**: Authentication → URL Configuration
4. **Update Site URL**:
   ```
   https://khatalens.vercel.app
   ```

5. **Add to Redirect URLs**:
   ```
   https://khatalens.vercel.app/**
   https://khatalens.vercel.app/auth/callback
   https://khatalens.vercel.app/customer
   https://khatalens.vercel.app/dashboard/**
   ```

6. **Click "Save"**

---

## ✅ Part 4: Test Your Deployment

### Test Checklist:

1. **Frontend loads fast** ✅
   - Visit: `https://khatalens.vercel.app`
   - Should load in 1-2 seconds

2. **Backend is accessible** ✅
   - Visit: `https://khatalens-api-production.up.railway.app/health`
   - Should return: `{"status":"healthy","database":"sqlite"}`

3. **Google Login works** ✅
   - Go to: `https://khatalens.vercel.app/login`
   - Click "Continue with Google"
   - Should redirect to Google login
   - After login, should redirect to dashboard

4. **All pages work** ✅
   - Test: Analytics, Customers, Import Sheet, Chatbot
   - All should load without errors

---

## 🎉 You're Done!

### Your Deployment URLs:

```
Frontend: https://khatalens.vercel.app
Backend:  https://khatalens-api-production.up.railway.app
Health:   https://khatalens-api-production.up.railway.app/health
```

### Performance:

- ⚡ **Frontend**: 1-2 seconds (Vercel CDN)
- 🚀 **Backend**: 2-3 seconds (Railway)
- 💰 **Cost**: $0 (Both free tiers)

---

## 🔄 Auto-Deploy

Both platforms auto-deploy on push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

- **Vercel**: Redeploys frontend automatically
- **Railway**: Redeploys backend automatically

---

## 🆘 Troubleshooting

### Frontend shows blank page
- Check environment variables in Vercel
- Ensure `VITE_API_URL` points to Railway backend
- Check browser console for errors

### Google Login fails
- Verify Google Cloud Console has Vercel URL
- Check Supabase redirect URLs
- Ensure Site URL is set to Vercel URL

### API calls fail
- Verify backend is running on Railway
- Check CORS settings in `api.py`
- Ensure `VITE_API_URL` is correct

### Backend spins down
- First request after 15 min takes ~30 seconds
- This is normal on Railway free tier
- Upgrade to paid plan ($7/month) for always-on

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- GitHub Issues: https://github.com/Asadjafri9/KhataLens/issues

---

**Happy Deploying! 🚀**
