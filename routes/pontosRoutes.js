import express from 'express';
import { adicionarPontos, removerPontos } from '../controllers/pontosController.js';

const router = express.Router();

router.put('/:id/adicionar', adicionarPontos);
router.put('/:id/remover', removerPontos); 

export default router;