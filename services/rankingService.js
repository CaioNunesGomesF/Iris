import rankingModel from '../models/RankingModel.js'; 

console.log('rankingModel importado:', rankingModel); 

function getColor(index) {
  const colors = [
    '#42A5F5', '#66BB6A', '#AB47BC', '#FF7043', '#EC407A',
    '#FF5722', '#FFCA28', '#26C6DA', '#26A69A', '#5C6BC0'
  ];
  return colors[index % colors.length];
}

async function getFormattedRanking() {
  try {
    const rows = await rankingModel.getTopRankingUsers();
    if (!rows || rows.length === 0) {
      return [];
    }

    return rows.map((row, index) => ({
      position: (index + 1).toString(),
      name: row.name,
      points: `${row.pontosTotais} pontos`,
      color: getColor(index),
    }));
  } catch (error) {
    console.error('Erro no rankingService:', error);
    throw error;
  }
}

export default { getFormattedRanking };