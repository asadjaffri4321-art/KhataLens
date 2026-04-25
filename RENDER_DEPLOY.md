# 🚀 Deploy KhataLens to Render

## Quick Deploy Guide

### Prerequisites
- GitHub account with KhataLens repository
- Render account (free): https://render.com
- Your environment variables ready

---

## 📦 Step 1: Push Code to GitHub

```bash
cd KhataLens
git add .
git commit -m "Add Render deployment config"
git push origin main
```

---

## 🌐 Step 2: Deploy on Render

### Option A: Blueprint (Automatic - Recommended)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Click **"New +"** → **"Blueprint"**

2. **Connect Repository**
   - Connect your GitHub account
   - Select **KhataLens** repository
   - Render will detect `render.yaml`

3. **Add Environment Variables**
   
   Click on each service and add these variables:

   **For `khatalens-api` (Backend):**
   ```
   GOOGLE_API_KEY=AIzaSyA3st55Rym_QSeLj6wECAJUppaxfgDxcLo
   VITE_GOOGLE_API_KEY=AIzaSyA3st55Rym_QSeLj6wECAJUppaxfgDxcLo
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

   **For `khatalens-frontend` (Frontend):**
   ```
   VITE_API_URL=https://khatalens-api.onrender.com
   VITE_SUPABASE_URL=https://maiphysqksiypzhdunji.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GOOGLE_API_KEY=AIzaSyA3st55Rym_QSeLj6wECAJUppaxfgDxcLo
   ```

4. **Deploy**
   - Click **"Apply"**
   - Wait 5-10 minutes for deployment

5. **Update Frontend API URL** (Important!)
   - After backend deploys, copy its URL
   - Go to frontend service → Environment
   - Update `VITE_API_URL` with actual backend URL
   - Click **"Save Changes"** (triggers redeploy)

---

### Option B: Manual Deployment

#### Deploy Backend First

1. **Create Web Service**
   - Dashboard → **"New +"** → **"Web Service"**
   - Connect GitHub → Select repository

2. **Configure Backend**
   ```
   Name: khatalens-api
   Region: Oregon (US West)
   Branch: main
   Root Directory: (leave empty)
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn api:app --host 0.0.0.0 --port $PORT
   Plan: Free
   ```

3. **Add Environment Variables** (see above)

4. **Create Service** → Copy the URL

#### Deploy Frontend Second

1. **Create Static Site**
   - Dashboard → **"New +"** → **"Static Site"**
   - Connect GitHub → Select repository

2. **Configure Frontend**
   ```
   Name: khatalens-frontend
   Branch: main
   Root Directory: (leave empty)
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

3. **Add Environment Variables** (use backend URL from step 4)

4. **Add Rewrite Rule**
   - Go to **"Redirects/Rewrites"** tab
   - Add: Source `/*` → Destination `/index.html` → Rewrite

5. **Create Static Site**

---

## ✅ Step 3: Verify Deployment

1. **Check Backend Health**
   - Visit: `https://khatalens-api.onrender.com/health`
   - Should return: `{"status":"healthy","database":"sqlite"}`

2. **Test Frontend**
   - Visit your frontend URL
   - Test navigation, login, features

3. **Check Logs**
   - Go to each service → **"Logs"** tab
   - Look for errors

---

## 🔧 Common Issues & Fixes

### Backend Won't Start
- **Check logs** for Python errors
- Verify all environment variables are set
- Ensure `requirements.txt` is complete

### Frontend Shows Blank Page
- Check browser console (F12)
- Verify `VITE_API_URL` points to backend
- Ensure rewrite rule is set

### API Calls Fail (CORS Error)
- Backend URL must be correct in frontend env
- Check `api.py` CORS settings

### Database Resets on Deploy
- **Expected on free tier** (SQLite is ephemeral)
- Solution: Use PostgreSQL or Supabase
- Or upgrade to paid plan with persistent disk

---

## 📊 Your Deployment URLs

After deployment, save these:

```
Frontend: https://khatalens-frontend.onrender.com
Backend:  https://khatalens-api.onrender.com
Health:   https://khatalens-api.onrender.com/health
```

---

## 🔄 Auto-Deploy

Render automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Both services will redeploy automatically!

---

## 💰 Cost

**Free Tier:**
- Backend: Free (spins down after 15 min inactivity)
- Frontend: Free (100 GB bandwidth/month)
- **Note**: First request after spin-down takes ~30 seconds

**Paid Tier** ($7/month per service):
- Always on (no spin-down)
- Faster response times
- More resources

---

## 🎯 Next Steps

1. ✅ Deploy to Render
2. ✅ Test all features
3. ✅ Set up custom domain (optional)
4. ✅ Configure PostgreSQL for persistence
5. ✅ Monitor logs and metrics

---

## 📞 Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- GitHub Issues: https://github.com/Asadjafri9/KhataLens/issues

---

## 🎉 You're Done!

Your KhataLens app is now live on Render! 🚀
