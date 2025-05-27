import { adicionarPontos, removerPontos } from '../services/pontosService.js';

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
