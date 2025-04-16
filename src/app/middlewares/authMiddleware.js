import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não existe.' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer') {
      return res.status(401).json({ error: 'Token malformatado.' });
    }

    const user = jwt.verify(token, process.env.SECRET_KEY);

    req.user = user;

    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};
