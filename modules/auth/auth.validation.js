import { ValidationError } from '../../util/errors.js';

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (typeof email !== 'string' || !email.trim()) {
        return next(new ValidationError('Email is required'));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
        return next(new ValidationError('Enter a valid email address'));
    }

    if (typeof password !== 'string' || !password) {
        return next(new ValidationError('Password is required'));
    }

    next();
};