import express from 'express';
import { cadastro, login, deleteUser, getPerfil } from '../controllers/authController.js';

import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/cadastro', cadastro);
router.post('/login', login);
router.delete('/delete', authenticateToken, deleteUser);
router.get('/perfil', authenticateToken, getPerfil);

export default router;