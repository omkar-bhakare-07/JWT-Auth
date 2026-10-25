import jsonwebtoken from 'jsonwebtoken';
import {JWT as jwtConfig} from '../config/env.config.js';

export const signToken = (payload) => {
    return jsonwebtoken.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiry });
};

export const verifyToken = (token) => {
    return jsonwebtoken.verify(token, jwtConfig.secret); // throws if invalid/expired
};