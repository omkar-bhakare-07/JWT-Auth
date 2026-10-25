import * as noteRepo from './notes.repository.js';
import { NotFoundError, ValidationError } from '../../util/errors.js';

export const createNote = async (userId, data) => {
    const title = typeof data.title === 'string' ? data.title.trim() : '';
    if (!title) throw new ValidationError('Note title is required');

    return noteRepo.createNote(userId, {
        title,
        content: typeof data.content === 'string' ? data.content.trim() : ''
    });
};

export const getNotes = async (userId) => noteRepo.getNotesByUser(userId);

export const getNote = async (noteId, userId) => {
    const note = await noteRepo.getNoteByIdForUser(noteId, userId);
    if (!note) throw new NotFoundError('Note');
    return note;
};

export const updateNote = async (noteId, userId, data) => {
    const updates = {};
    if (Object.hasOwn(data, 'title')) {
        if (typeof data.title !== 'string' || !data.title.trim()) {
            throw new ValidationError('Note title cannot be empty');
        }
        updates.title = data.title.trim();
    }
    if (Object.hasOwn(data, 'content')) {
        if (typeof data.content !== 'string') {
            throw new ValidationError('Note content must be a string');
        }
        updates.content = data.content.trim();
    }
    if (Object.keys(updates).length === 0) {
        throw new ValidationError('Provide title or content to update');
    }

    const note = await noteRepo.updateNoteByIdForUser(noteId, userId, updates);
    if (!note) throw new NotFoundError('Note');
    return note;
};

export const deleteNote = async (noteId, userId) => {
    const note = await noteRepo.deleteNoteByIdForUser(noteId, userId);
    if (!note) throw new NotFoundError('Note');
    return note;
};
