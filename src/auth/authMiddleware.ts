import { verifyToken } from './jwt';

export function getUserIdFromReq(req: any) {
  const token = req.headers.authorization || '';
  if (!token) return null;
  try {
    const decoded = verifyToken(token.replace('Bearer ', ''));
    if (typeof decoded === 'object' && 'userId' in decoded) {
      return (decoded as any).userId;
    }
    return null;
  } catch {
    return null;
  }
}