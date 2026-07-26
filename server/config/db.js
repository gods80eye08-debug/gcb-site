const mysql = require('mysql2/promise');

async function connectDB() {
  const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    DB_SSL
  } = process.env;

  if (!DB_HOST || !DB_USER || !DB_NAME) {
    throw new Error('Database env missing: require DB_HOST, DB_USER, DB_NAME');
  }

  const port = DB_PORT ? Number(DB_PORT) : 3306;

  // Determine SSL config: cloud providers (PlanetScale, Aiven, etc.) require SSL
  // For PlanetScale, we use rejectUnauthorized: false for compatibility
  const sslConfig = DB_SSL === 'true' || DB_SSL === '1'
    ? { rejectUnauthorized: false }
    : undefined;

  const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port,
    ssl: sslConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Test connection
  const conn = await pool.getConnection();
  conn.release();

  // eslint-disable-next-line no-console
  console.log('MySQL connected');

  return pool;
}

module.exports = { connectDB };


