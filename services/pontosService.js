import pool from '../database/db.js';

export const adicionarPontos = async (id, pontos) => {
  try {
    await pool.query(
      `UPDATE User 
       SET pontosAtuais = pontosAtuais + ?,
           pontosTotais = pontosTotais + ?,
           pontosDiario = pontosDiario + ?
       WHERE id = ?`,
      [pontos, pontos, pontos, id]
    );
  } catch (error) {
    console.error('Erro no serviço ao adicionar pontos:', error);
    throw error;
  }
};

export const removerPontos = async (id, pontos) => {
  try {
    await pool.query(
      `UPDATE User 
       SET pontosAtuais = GREATEST(pontosAtuais - ?, 0)
       WHERE id = ?`,
      [pontos, id]
    );
  } catch (error) {
    console.error('Erro no serviço ao remover pontos:', error);
    throw error;
  }
};
