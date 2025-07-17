import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (sessionId: string) => 
    jwt.sign({ sessionId }, JWT_SECRET);

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);