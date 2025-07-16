import { verifyToken } from './jwt';
import prisma from '../db/prisma';

export async function getUserIdFromReq(req: any) {
  const token = req.headers.authorization || '';
  if (!token.startsWith('Bearer ')) return null;
  const tokenValue = token.replace('Bearer ', '');
  try {
    const decoded = verifyToken(tokenValue);
    if (typeof decoded === 'object' && 'userId' in decoded) {
      return await prisma.user.findUnique({ where: { id: (decoded as any).userId } });
    }
    return null;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}