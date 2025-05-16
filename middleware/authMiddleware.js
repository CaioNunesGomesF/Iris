import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_supersecreto';

export function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    // Se o token não estiver presente, retorna erro 401

    if (!token) {

        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded; // para o frontend saber quem é o usuário

        next();

    } catch (err) {

        return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
}
