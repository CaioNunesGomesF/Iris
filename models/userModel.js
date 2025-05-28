import pool from '../database/db.js';

//Cria novo usuário no banco
export async function createUser(name, email, hashedPassword) {
  const [result] = await pool.execute(

    'INSERT INTO User (name, email, password) VALUES (?, ?, ?)',

    [name, email, hashedPassword]
  );
  return result.insertId;
}

//Busca usuário pelo email
export async function getUserByEmail(email) {

  const [rows] = await pool.execute(
    'SELECT * FROM User WHERE email = ?',
    [email]
  );
    if (rows.length === 0) return null; 
  return rows[0];
}

export async function deleteUser(userId) {
  const [result] = await pool.execute(
    'DELETE FROM User WHERE id = ?',
    [userId]
  );
  return result;
}

export const getUserProfile = async (userId) => {
  const [rows] = await pool.query(
    `SELECT U.name, U.email, P.nome AS plano
     FROM User U
     LEFT JOIN Planos P ON U.plano_id = P.id
     WHERE U.id = ?`,
    [userId]
  );
  return rows;
};

export default { createUser, getUserByEmail, deleteUser, getUserProfile };