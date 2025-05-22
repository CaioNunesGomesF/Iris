import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',     
  user: process.env.DB_USER || 'root',          
  password: process.env.DB_PASSWORD || '12345', 
  database: process.env.DB_NAME || 'IrisDatabase', 
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

export default pool;
