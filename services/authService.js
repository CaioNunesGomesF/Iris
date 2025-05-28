import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { createUser, getUserByEmail, deleteUser, getUserProfile } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_supersecreto';

// Cadastro de usuário
export async function registerUser(name, email, password) {

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new Error('Email já está em uso');
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  await createUser(name, email, hashedPassword);
}

// Login - autenticação + geração do token JWT
export async function authenticateUser(email, password) {

  const user = await getUserByEmail(email);

  if (!user) {

    throw new Error('Usuário não encontrado');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {

    throw new Error('Senha incorreta');
  }

  // Gera o token JWT com payload contendo id do usuário
  const token = jwt.sign(

    { id: user.id, name: user.name },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { user, token };
}

export async function deleteUserService(userId) {
  
  const result = await deleteUser(userId);

  if (result.affectedRows === 0) {
    return { success: false, message: 'Usuário não encontrado' };
  }

  return { success: true, message: 'Usuário deletado com sucesso' };
}

export const getPerfilService = async (userId) => {
  const rows = await getUserProfile(userId);

  if (rows.length === 0) {
    return null;
  }

  const { name, email, plano } = rows[0];
  return { name, email, plano: plano || 'Sem plano' };
};
