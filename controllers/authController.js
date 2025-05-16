import { registerUser, authenticateUser } from '../services/authService.js';

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

export default { cadastro, login };