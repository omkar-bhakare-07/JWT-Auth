import User from '../../models/user.model.js';

export const getUser = (userId) => User.findById(userId);

export const getUserForLogin = (email) =>
    User.findOne({ email: email.trim().toLowerCase() }).select('+password');

export const getUserByEmail = (email) =>
    User.findOne({ email: email.trim().toLowerCase() });

export const getUserByPhoneNumber = (phoneNumber) =>
    User.findOne({ phoneNumber: phoneNumber.trim() });

export const createUser = (userData) => User.create(userData);
