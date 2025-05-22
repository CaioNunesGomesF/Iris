import pool from '../database/db.js';

export const getNome = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT name FROM User WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json({ name: rows[0].name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar nome' });
  }
};

export const getEmail = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT email FROM User WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json({ email: rows[0].email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar email' });
  }
};

export const getPontosByTipo = async (req, res) => {
  const { id, tipo } = req.params;

  let coluna;

  if (tipo === 'totais') coluna = 'pontosTotais';
  else if (tipo === 'diario') coluna = 'pontosDiario';
  else if (tipo === 'atuais') coluna = 'pontosAtuais';
  else return res.status(400).json({ error: 'Tipo inválido. Use "totais", "diario" ou "atuais".' });

  try {
    const [rows] = await pool.query(`SELECT ?? FROM User WHERE id = ?`, [coluna, id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json({ [coluna]: rows[0][coluna] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pontos' });
  }
};