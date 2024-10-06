import pgs from "pg";
import dotenv from "dotenv";

const { Pool } = pgs;
const env = dotenv.config().parsed;

const pool = new Pool({
  host: env.DB_HOST,
  user: env.DB_USER,
  database: env.DB_NAME,
  password: env.DB_PASS,
  port: env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
