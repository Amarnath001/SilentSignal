# SilentSignal Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend) - FREE - Recommended

#### Frontend Deployment (Vercel):

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure build settings:**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend-react`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. **Add Environment Variable:**
   - **Name**: `VITE_API_URL`
   - **Value**: Your backend URL (from Railway deployment)

#### Backend Deployment (Render - FREE):

1. **Go to [render.com](https://render.com)**
2. **Sign up with GitHub**
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure service:**
   - **Name**: `silent-signal-backend`
   - **Root Directory**: `silent_signal/backend/api`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: `Free`
6. **Click "Create Web Service"**
7. **Wait for deployment (takes 5-10 minutes)**
8. **Copy your backend URL** (e.g., `https://silent-signal-backend.onrender.com`)

#### After Backend Deployment:

1. **Copy your Render backend URL** (e.g., `https://silent-signal-backend.onrender.com`)
2. **Go back to Vercel frontend settings**
3. **Add Environment Variable:**
   - **Name**: `VITE_API_URL`
   - **Value**: `https://silent-signal-backend.onrender.com`
4. **Redeploy frontend**

---

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend Deployment (Netlify):

1. **Go to [netlify.com](https://netlify.com)**
2. **Connect GitHub repository**
3. **Build settings:**
   - **Base directory**: `frontend-react`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. **Add Environment Variable:**
   - **Name**: `VITE_API_URL`
   - **Value**: Your backend URL

#### Backend Deployment (Render):

1. **Go to [render.com](https://render.com)**
2. **New Web Service**
3. **Connect GitHub repository**
4. **Settings:**
   - **Root Directory**: `silent_signal/backend/api`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Deploy!**

---

### Option 3: Everything on Render (100% Free)

#### Deploy Both Frontend and Backend on Render:

1. **Go to [render.com](https://render.com)**
2. **Sign up with GitHub**
3. **Deploy Backend:**
   - **New + → Web Service**
   - **Connect GitHub repository**
   - **Name**: `silent-signal-backend`
   - **Root Directory**: `silent_signal/backend/api`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: `Free`

4. **Deploy Frontend:**
   - **New + → Static Site**
   - **Connect GitHub repository**
   - **Name**: `silent-signal-frontend`
   - **Root Directory**: `frontend-react`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: `Free`

5. **Configure Frontend Environment:**
   - **Go to your frontend service settings**
   - **Add Environment Variable:**
     - **Name**: `VITE_API_URL`
     - **Value**: Your backend URL (e.g., `https://silent-signal-backend.onrender.com`)

---

### Option 4: Railway (Has Free Tier)

1. **Go to [railway.app](https://railway.app)**
2. **Create two services:**
   - **Frontend Service**: Root directory `frontend-react`
   - **Backend Service**: Root directory `silent_signal/backend/api`
3. **Configure each service separately**

---

## 📝 Pre-Deployment Checklist

- [ ] Push all changes to GitHub
- [ ] Test locally with `npm run dev` (frontend) and `uvicorn main:app --reload` (backend)
- [ ] Ensure all environment variables are configured
- [ ] Check that CORS is properly configured in backend
- [ ] Verify API endpoints are working

## 🔧 Environment Variables

### Frontend (Vercel/Netlify):
- `VITE_API_URL`: Your backend deployment URL

### Backend (Railway/Render):
- `PORT`: Automatically set by platform
- Add any API keys if needed (OpenAI, etc.)

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure backend has proper CORS configuration
2. **API Not Found**: Check that `VITE_API_URL` is set correctly
3. **Build Failures**: Check build logs for missing dependencies
4. **Backend Won't Start**: Verify Python version and dependencies

### Debug Steps:

1. Check deployment logs
2. Test API endpoints directly
3. Verify environment variables
4. Check network requests in browser dev tools

## 🎉 Post-Deployment

Once deployed:
1. Test the full application flow
2. Share your deployed URLs
3. Update README with live demo links
4. Celebrate your hackathon project! 🚀

---

## 📞 Support

If you encounter issues:
1. Check the deployment platform logs
2. Verify all configuration steps
3. Test locally first
4. Check GitHub repository for latest changes
