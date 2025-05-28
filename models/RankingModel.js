import pool from '../database/db.js';

export async function getTopRankingUsers() {

  
  try {
    const [rows] = await pool.execute(
      'SELECT name, pontosTotais FROM User ORDER BY pontosTotais DESC LIMIT 10',
    );
    return rows;
  } catch (error) {
    console.error('Erro ao buscar ranking no modelo:', error);
    throw error;
  }
}

export default { getTopRankingUsers };