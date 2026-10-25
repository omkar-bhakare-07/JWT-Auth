import express from 'express';
import * as controller from './user.controller.js';
import { validateAddUser } from './user.validation.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

export const userRouter = express.Router();

// Registration is public; profile is always resolved from the verified JWT.
userRouter.post('/add', validateAddUser, controller.createUser);
userRouter.get('/me', requireAuth, controller.fetchUser);
