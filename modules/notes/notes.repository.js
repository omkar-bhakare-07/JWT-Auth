import Note from '../../models/note.model.js';

export const createNote = (userId, data) =>
    Note.create({ ...data, user: userId });

export const getNotesByUser = (userId) =>
    Note.find({ user: userId }).sort({ updatedAt: -1 });

export const getNoteByIdForUser = (noteId, userId) =>
    Note.findOne({ _id: noteId, user: userId });

export const updateNoteByIdForUser = (noteId, userId, updates) =>
    Note.findOneAndUpdate(
        { _id: noteId, user: userId },
        { $set: updates },
        { new: true, runValidators: true }
    );

export const deleteNoteByIdForUser = (noteId, userId) =>
    Note.findOneAndDelete({ _id: noteId, user: userId });
