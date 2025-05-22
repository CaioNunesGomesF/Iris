import pool from '../database/db.js';

export const adicionarPontos = async (req, res) => {
  const { id } = req.params;
  const { pontos } = req.body;

  if (typeof pontos !== 'number' || pontos <= 0) {
    return res.status(400).json({ error: 'Informe um valor de pontos válido e positivo' });
  }

  try {
    await pool.query(`
      UPDATE User
      SET pontosAtuais = pontosAtuais + ?,
          pontosTotais = pontosTotais + ?,
          pontosDiario = pontosDiario + ?
      WHERE id = ?
    `, [pontos, pontos, pontos, id]);

    res.status(200).json({ message: `Adicionados ${pontos} pontos com sucesso.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar pontos' });
  }
};

export const removerPontos = async (req, res) => {
  const { id } = req.params;
  const { pontos } = req.body;

  if (typeof pontos !== 'number' || pontos <= 0) {
    return res.status(400).json({ error: 'Informe um valor de pontos válido e positivo' });
  }

  try {
    // Primeiro, garantir que os pontos atuais não fiquem negativos:
    const [rows] = await pool.query('SELECT pontosAtuais, pontosTotais, pontosDiario FROM User WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const user = rows[0];

    if (user.pontosAtuais < pontos || user.pontosTotais < pontos || user.pontosDiario < pontos) {
      return res.status(400).json({ error: 'Saldo de pontos insuficiente para remoção' });
    }

    await pool.query(`
      UPDATE User
      SET pontosAtuais = pontosAtuais - ?,
          pontosTotais = pontosTotais - ?,
          pontosDiario = pontosDiario - ?
      WHERE id = ?
    `, [pontos, pontos, pontos, id]);

    res.status(200).json({ message: `Removidos ${pontos} pontos com sucesso.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover pontos' });
  }
};
