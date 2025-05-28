import express from 'express';
const router = express.Router();
import rankingController from '../controllers/rankingController.js';

router.get('/', rankingController.getRanking);

export default router;
