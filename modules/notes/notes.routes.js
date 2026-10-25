import express from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import * as controller from './notes.controller.js';

export const notesRouter = express.Router();

notesRouter.use(requireAuth);
notesRouter.route('/')
    .get(controller.getNotes)
    .post(controller.createNote);

notesRouter.route('/:noteId')
    .get(controller.getNote)
    .patch(controller.updateNote)
    .delete(controller.deleteNote);
