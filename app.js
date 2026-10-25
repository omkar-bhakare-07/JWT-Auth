import express from 'express';
import { authRouter } from './modules/auth/auth.routes.js';
import { userRouter } from './modules/user/user.routes.js';
import { notesRouter } from './modules/notes/notes.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

export const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/notes', notesRouter);

app.use(errorHandler);
