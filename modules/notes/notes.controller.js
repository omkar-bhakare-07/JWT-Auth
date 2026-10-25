import * as notesService from './notes.service.js';

export const createNote = async (req, res, next) => {
    try {
        const note = await notesService.createNote(req.auth.userId, req.body);
        return res.status(201).json({
            success: true,
            data: note,
            message: 'Note created successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) { return next(error); }
};

export const getNotes = async (req, res, next) => {
    try {
        const notes = await notesService.getNotes(req.auth.userId);
        return res.status(200).json({
            success: true,
            data: notes,
            message: 'Notes fetched successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) { return next(error); }
};

export const getNote = async (req, res, next) => {
    try {
        const note = await notesService.getNote(req.params.noteId, req.auth.userId);
        return res.status(200).json({
            success: true,
            data: note,
            message: 'Note fetched successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) { return next(error); }
};

export const updateNote = async (req, res, next) => {
    try {
        const note = await notesService.updateNote(
            req.params.noteId, req.auth.userId, req.body
        );
        return res.status(200).json({
            success: true,
            data: note,
            message: 'Note updated successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) { return next(error); }
};

export const deleteNote = async (req, res, next) => {
    try {
        await notesService.deleteNote(req.params.noteId, req.auth.userId);
        return res.status(200).json({
            success: true,
            data: null,
            message: 'Note deleted successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) { return next(error); }
};
