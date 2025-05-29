import pool from '../database/db.js';

import { buscarPontosPorEmailDB } from '../models/userModel.js';

export const adicionarPontos = async (id, pontos) => {
  try {
    // Buscar o plano do usuário (ajuste nomes das tabelas/campos conforme seu banco)
    const [rows] = await pool.query(
      `SELECT P.nome AS planoNome 
       FROM User U
       JOIN Planos P ON U.plano_id = P.id
       WHERE U.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      throw new Error('Usuário não encontrado');
    }

    const planoNome = rows[0].planoNome;

    // Calcular pontos com bônus de 20% se plano for mensal
    let pontosFinal = pontos;
    if (planoNome.toLowerCase() === 'mensal') {
      pontosFinal = pontos * 1.2;
    }

    // Atualizar os pontos do usuário
    await pool.query(
      `UPDATE User 
       SET pontosAtuais = pontosAtuais + ?,
           pontosTotais = pontosTotais + ?,
           pontosDiario = pontosDiario + ?
       WHERE id = ?`,
      [pontosFinal, pontosFinal, pontosFinal, id]
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

export const buscarPontosPorEmailService = async (email) => {
  const rows = await buscarPontosPorEmailDB(email);
  if (rows.length === 0) {
    throw new Error('Usuário não encontrado');
  }
  return rows[0];
};