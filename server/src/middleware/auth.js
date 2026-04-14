import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const verifyToken = promisify(jwt.verify);
const jwtSecret = () => process.env.JWT_SECRET || 'dev-mock-secret';

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    if (globalThis.__MOCK_DB__) {
      req.user = { id: '507f1f77bcf86cd799439011' };
      return next();
    }
    // If we're in dev mode without Clerk secret, allow a mock user for now
    if (process.env.NODE_ENV === 'development' && !process.env.CLERK_SECRET_KEY) {
      req.user = { id: '507f1f77bcf86cd799439011' };
      return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // If it looks like a Clerk token (starts with __session), we might need Clerk SDK
    // For now, if no Clerk secret is found, we'll try to decode it without verification in dev
    if (process.env.NODE_ENV === 'development' && !process.env.CLERK_SECRET_KEY) {
      const decoded = jwt.decode(token);
      req.user = decoded || { id: '507f1f77bcf86cd799439011' };
      return next();
    }

    const decoded = await verifyToken(token, jwtSecret());
    req.user = decoded;
    next();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      req.user = { id: '507f1f77bcf86cd799439011' };
      return next();
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};
