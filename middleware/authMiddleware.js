import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_supersecreto';

export function authenticateToken(req, res, next) {

    console.log('Headers recebidos:', req.headers);

    const authHeader = req.headers['authorization'];

    console.log('Authorization header:', authHeader);

    if (!authHeader) {
  return res.status(401).json({ message: 'Cabeçalho Authorization ausente' });
}

    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
  return res.status(401).json({ message: 'Token não fornecido no header Authorization' });
}

    if (!token) {

        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
}

export default { authenticateToken };
