import pool from '../database/db.js';

export async function getTopUsers(limit = 10) {
  const [rows] = await pool.execute(
    'SELECT * FROM User ORDER BY pontosTotais DESC LIMIT ?',
    [limit]
  );
  return rows;
}
