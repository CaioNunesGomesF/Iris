import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import pontosRouter from './routes/pontosRoutes.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Application is running!');
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/user', pontosRouter);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})