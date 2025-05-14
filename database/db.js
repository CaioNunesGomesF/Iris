import mysql from 'mysql2/promise';

import dotenv from 'dotenv';

dotenv.config()

const bdConfig = {
    host: process.env.HOST || '127.0.0.1', 
    user: process.env.USER || 'root', 
    password: process.env.PASSWORD || '12345',
    database: process.env.DATABASE || 'User',
    port: process.env.DB_PORT || 3306
}

const pool = mysql.createPool(bdConfig);

export default pool;