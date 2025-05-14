import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../models/userModel.js';

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

// Login
export async function authenticateUser(email, password) {

  const User = await getUserByEmail(email);

  if (!User) {

    throw new Error('Usuário não encontrado');
  }

  const isValidPassword = await bcrypt.compare(password, User.password);

  if (!isValidPassword) {
    
    throw new Error('Senha incorreta');
  }

  return User;
}
