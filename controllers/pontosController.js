import { adicionarPontos, removerPontos, buscarPontosPorEmailService } from '../services/pontosService.js';
import pool from '../database/db.js';

export const adicionarPontosController = async (req, res) => {
  const { id } = req.params;
  const { pontos } = req.body;

  if (typeof pontos !== 'number' || pontos <= 0) {
    return res.status(400).json({ error: 'O valor de pontos deve ser um número positivo.' });
  }

  try {
    await adicionarPontos(id, pontos);
    res.status(200).json({ message: 'Pontos adicionados com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar pontos' });
  }
};

export const removerPontosController = async (req, res) => {
  const { id } = req.params;
  const { pontos } = req.body;

  if (typeof pontos !== 'number' || pontos <= 0) {
    return res.status(400).json({ error: 'O valor de pontos deve ser um número positivo.' });
  }

  try {
    await removerPontos(id, pontos);
    res.status(200).json({ message: 'Pontos removidos com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover pontos' });
  }
};

export const buscarPontosPorEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const pontos = await buscarPontosPorEmailService(email);
    res.status(200).json(pontos);
  } catch (error) {
    console.error('Erro ao buscar pontos do usuário:', error.message);
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro ao buscar pontos do usuário' });
  }
};