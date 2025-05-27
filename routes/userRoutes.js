import express from 'express';
import { getNome, getEmail, getPontosByTipo, getPlano } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id/name', getNome);
router.get('/:id/email', getEmail);
router.get('/:id/pontos/:tipo', getPontosByTipo); 
router.get('/plano/:id', getPlano);

export default router;