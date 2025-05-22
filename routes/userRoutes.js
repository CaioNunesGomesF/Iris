import express from 'express';
import { getNome, getEmail, getPontosByTipo } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id/name', getNome);
router.get('/:id/email', getEmail);
router.get('/:id/pontos/:tipo', getPontosByTipo); // tipo pode ser 'totais' ou 'diario'

export default router;