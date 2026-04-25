# 🚀 Deploy KhataLens to Railway

## Quick Deploy Guide (No Credit Card Required!)

Railway offers **$5 free credit per month** - perfect for hosting KhataLens!

---

## 📋 Prerequisites

- GitHub account with KhataLens repository access (owner or contributor)
- Railway account (free): https://railway.app
- Your environment variables ready

---

## 🎯 Step-by-Step Deployment

### Step 1: Sign Up for Railway

1. **Go to Railway**: https://railway.app
2. **Click "Login with GitHub"**
3. **Authorize Railway** to access your GitHub account
4. **No credit card required!** You get $5 free credit/month

---

### Step 2: Create New Project

1. **Click "New Project"** on Railway dashboard
2. **Select "Deploy from GitHub repo"**
3. **Choose "KhataLens"** repository
   - If you're a contributor, you'll see it in the list
   - Railway will deploy to YOUR account (uses YOUR credits)

---

### Step 3: Railway Auto-Detection

Railway will automatically detect:
- ✅ **Backend**: Python/FastAPI (from `api.py` and `requirements.txt`)
- ✅ **Frontend**: Node.js/Vite (from `package.json`)

Railway creates **2 services** automatically:
1. **khatalens-backend** (Python service)
2. **khatalens-frontend** (Node.js service)

---

### Step 4: Configure Backend Service

1. **Click on the Backend service**
2. **Go to "Variables" tab**
3. **Add these environment variables**:

```
GOOGLE_API_KEY=AIzaSyA3st55Rym_QSeLj6wECAJUppaxfgDxcLo
VITE_GOOGLE_API_KEY=AIzaSyA3st55Rym_QSeLj6wECAJUppaxfgDxcLo
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PYTHON_VERSION=3.11
```

4. **Go to "Settings" tab**
5. **Generate Domain** - Click "Generate Domain" to get a public URL
6. **Copy the backend URL** (e.g., `https://khatalens-backend-production.up.railway.app`)

---

### Step 5: Configure Frontend Service

1. **Click on the Frontend service**
2. **Go to "Variables" tab**
3. **Add these environment variables**:

```
VITE_API_URL=https://your-backend-url.railway.app
VITE_SUPABASE_URL=https://maiphysqksiypzhdunji.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GOOGLE_API_KEY=AIzaSyA3st55Rym_QSeLj6wECAJUppaxfgDxcLo
NODE_VERSION=18
```

**Important**: Replace `VITE_API_URL` with your actual backend URL from Step 4!

4. **Go to "Settings" tab**
5. **Set Build Command**: `npm run build`
6. **Set Start Command**: `npx vite preview --host 0.0.0.0 --port $PORT`
7. **Generate Domain** - Click "Generate Domain"

---

### Step 6: Deploy!

1. **Both services will deploy automatically**
2. **Wait 5-10 minutes** for initial deployment
3. **Check logs** for any errors
4. **Visit your frontend URL** to test!

---

## ✅ Verify Deployment

### Test Backend:
Visit: `https://your-backend-url.railway.app/health`

Should return:
```json
{"status":"healthy","database":"sqlite"}
```

### Test Frontend:
Visit: `https://your-frontend-url.railway.app`

Should show the KhataLens landing page!

---

## 🔧 Common Issues & Fixes

### Backend Won't Start
- **Check logs** in Railway dashboard
- Verify all environment variables are set
- Ensure `requirements.txt` is complete
- Check Python version is 3.11+

### Frontend Shows Blank Page
- **Check browser console** (F12) for errors
- Verify `VITE_API_URL` points to correct backend URL
- Ensure build completed successfully
- Check if all environment variables are set

### API Calls Fail (CORS Error)
- Backend URL must be correct in frontend env
- Check `api.py` CORS settings
- Ensure backend is running (check `/health` endpoint)

### Database Resets on Deploy
- **Expected behavior** with SQLite (ephemeral storage)
- **Solution**: Use Railway's PostgreSQL plugin
- Or use Supabase for data persistence

---

## 💾 Add PostgreSQL (Optional but Recommended)

To persist your database:

1. **Click "New"** in your project
2. **Select "Database" → "Add PostgreSQL"**
3. **Railway will create a PostgreSQL database**
4. **Update `api.py`** to use PostgreSQL instead of SQLite
5. **Add to requirements.txt**: `psycopg2-binary`

---

## 💰 Cost & Credits

### Free Tier:
- **$5 credit per month** (no card required)
- **~500 hours** of runtime
- **100 GB bandwidth**
- **No spin-down** (always on!)

### Usage Tips:
- Monitor usage in Railway dashboard
- Free tier is perfect for demos and testing
- Upgrade to paid plan ($5/month) for production

---

## 🔄 Auto-Deploy from GitHub

Railway automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Both services will redeploy automatically! 🚀

---

## 📊 Your Deployment URLs

After deployment, save these:

```
Frontend: https://khatalens-frontend-production.up.railway.app
Backend:  https://khatalens-backend-production.up.railway.app
Health:   https://khatalens-backend-production.up.railway.app/health
```

---

## 🎯 Deployment Checklist

- [ ] Railway account created (no card needed)
- [ ] Project created from GitHub repo
- [ ] Backend environment variables added
- [ ] Backend domain generated
- [ ] Frontend environment variables added (with backend URL)
- [ ] Frontend domain generated
- [ ] Both services deployed successfully
- [ ] Backend health check passes
- [ ] Frontend loads correctly
- [ ] API calls work (test login, features)

---

## 🆚 Railway vs Render

| Feature | Railway | Render |
|---------|---------|--------|
| Free Credit | $5/month | 750 hours/month |
| Spin-down | ❌ No | ✅ Yes (15 min) |
| Card Required | ❌ No | ❌ No |
| Setup | Easier | Moderate |
| PostgreSQL | ✅ Free | ✅ Free (90 days) |
| Auto-deploy | ✅ Yes | ✅ Yes |

**Winner**: Railway (no spin-down, easier setup)

---

## 🎉 You're Done!

Your KhataLens app is now live on Railway! 🚀

### Next Steps:
1. ✅ Test all features
2. ✅ Share your deployment URL
3. ✅ Monitor usage in Railway dashboard
4. ✅ Set up PostgreSQL for data persistence
5. ✅ Add custom domain (optional)

---

## 📞 Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/Asadjafri9/KhataLens/issues

---

## 💡 Pro Tips

1. **Use PostgreSQL** instead of SQLite for production
2. **Monitor your credits** in Railway dashboard
3. **Set up health checks** to monitor uptime
4. **Use environment groups** for different environments (dev/prod)
5. **Enable PR deployments** for testing before merging

---

**Happy Deploying! 🎊**
