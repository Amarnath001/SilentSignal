# SilentSignal Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) - Recommended

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

#### Backend Deployment (Railway):

1. **Go to [railway.app](https://railway.app)**
2. **Sign in with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select your repository**
5. **Configure service:**
   - **Root Directory**: `silent_signal/backend/api`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. **Deploy!**

#### After Backend Deployment:

1. **Copy your Railway backend URL** (e.g., `https://your-app.railway.app`)
2. **Go back to Vercel frontend settings**
3. **Add Environment Variable:**
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-app.railway.app`
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

### Option 3: Full Stack on Railway

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
