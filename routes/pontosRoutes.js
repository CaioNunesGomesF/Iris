import express from 'express';
import { adicionarPontosController, removerPontosController } from '../controllers/pontosController.js';

const router = express.Router();

router.put('/:id/adicionar', adicionarPontosController);
router.put('/:id/remover', removerPontosController); 

export default router;