import { verifyToken } from '../util/jwt.js';
import { UnauthorizedError } from '../util/errors.js';

export const requireAuth = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return next(new UnauthorizedError('Bearer token is required'));
    }

    const token = authorization.slice(7).trim();
    if (!token) {
        return next(new UnauthorizedError('Bearer token is required'));
    }

    try {
        const payload = verifyToken(token);

        if (!payload.userId) {
            return next(new UnauthorizedError('Invalid token payload'));
        }

        req.auth = {
            userId: payload.userId,
            email: payload.email
        };

        return next();
    } catch {
        return next(new UnauthorizedError('Invalid or expired token'));
    }
};
