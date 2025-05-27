import { registerUser, authenticateUser, deleteUserService } from '../services/authService.js';
import jwt from 'jsonwebtoken';
import pool from '../database/db.js';



export const cadastro = async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {

    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {

    await registerUser(name, email, password);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });

  } catch (error) {

    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {

    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
    const { user, token } = await authenticateUser(email, password);

    res.status(200).json({

      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    
    res.status(401).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) =>{
  try {
    const userId = req.user.id;

    const result = await deleteUserService(userId);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.status(200).json({ message: result.message });

  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ message: 'Erro interno ao deletar usuário' });
  }
}

export const getPerfil = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("ID recebido no token JWT:", userId);

    const [rows] = await pool.query(
      `SELECT U.name, U.email, P.nome AS plano
       FROM User U
       LEFT JOIN Planos P ON U.plano_id = P.id
       WHERE U.id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      console.log("Nenhum usuário encontrado com esse ID.");
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { name, email, plano } = rows[0];

    res.status(200).json({ name, email, plano: plano || 'Sem plano' });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro interno ao buscar perfil' });
  }
};


export default { cadastro, login, deleteUser, getPerfil };