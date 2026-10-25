import { getUser, addUser, login } from './user.service.js';

export const fetchUser = async (req, res, next) => {
    try {
        const result = await getUser(req.auth.userId);
        return res.status(200).json({
            success: true,
            data: result,
            message: 'User profile fetched successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) { return next(error); }
};

export const createUser = async (req, res, next) => {
    try {
        const result = await addUser(req.body);
        return res.status(201).json({
            success: true,
            data: result.userDetails,
            token: result.token,
            message: 'User registered successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) { return next(error); }
};

export const loginUser = async (req, res, next) => {
    try {
        const result = await login(req.body);
        return res.status(200).json({
            success: true,
            data: result.user,
            token: result.token,
            message: 'Login successful',
            timestamp: new Date().toISOString()
        });
    } catch (error) { return next(error); }
};
