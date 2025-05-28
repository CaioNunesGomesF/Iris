import rankingService from '../services/rankingService.js';

async function getRanking(req, res) {
  try {
    const ranking = await rankingService.getFormattedRanking();
    res.status(200).json(ranking);
  } catch (error) {
    console.error('Erro ao buscar ranking:', error);
    res.status(500).json({ message: 'Erro ao buscar ranking', error: error.message });
  }
}

export default {
  getRanking
};