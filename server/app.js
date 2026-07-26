require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const { connectDB } = require('./config/db');
const submitRoutes = require('./routes/submit');

const app = express();

app.use(express.json());

// Explicit CORS for Live Server / local testing / production
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  // Render production domain
  'https://gcb-site-backend.onrender.com',
  // Vercel production domain (if frontend deployed separately)
  'https://gcb-site.vercel.app',
  // Custom domain (if you have one)
  // 'https://yourdomain.com'
];

app.use(
  cors({
    origin(origin, cb) {
      // allow requests with no origin (like curl/postman)
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(helmet());

const PORT = process.env.PORT || 3000;

connectDB()
  .then((pool) => {
    // Attach pool so routes/controllers can access it
    app.locals.db = pool;

    app.use('/api/submit', submitRoutes);

    app.use(express.static(path.join(__dirname, '..', 'public')));

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', err);
    process.exit(1);
  });

