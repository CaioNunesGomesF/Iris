import express from 'express';
import { adicionarPontosController, removerPontosController, buscarPontosPorEmail } from '../controllers/pontosController.js';

const router = express.Router();

router.put('/:id/adicionar', adicionarPontosController);
router.put('/:id/remover', removerPontosController); 
router.get('/email/:email', buscarPontosPorEmail);

export default router;