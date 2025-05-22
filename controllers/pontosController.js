import pool from '../database/db.js';

// Adicionar pontos em todos os campos
export const adicionarPontos = async (req, res) => {
  const { id } = req.params;
  const { pontos } = req.body;

  try {
    await pool.query(
      `UPDATE User 
       SET pontosAtuais = pontosAtuais + ?,
           pontosTotais = pontosTotais + ?,
           pontosDiario = pontosDiario + ?
       WHERE id = ?`,
      [pontos, pontos, pontos, id]
    );

    res.status(200).json({ message: 'Pontos adicionados com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar pontos' });
  }
};

// Remover pontos apenas de pontosAtuais
export const removerPontos = async (req, res) => {
  const { id } = req.params;
  const { pontos } = req.body;

  try {
    await pool.query(
      `UPDATE User 
       SET pontosAtuais = GREATEST(pontosAtuais - ?, 0)
       WHERE id = ?`,
      [pontos, id]
    );

    res.status(200).json({ message: 'Pontos removidos com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover pontos' });
  }
};