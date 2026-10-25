import {ValidationError} from "../../util/errors.js";

export const validateGetUser = (req, res, next) => {
    const email = req.params.email;

    if(!email){
        throw new ValidationError('email is required');
    }

    next();
};

export const validateAddUser = (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (typeof firstName !== 'string' || firstName.trim().length < 2) {
        return res.status(400).json({
            message: 'First name must be at least 2 characters'
        });
    }

    if (typeof lastName !== 'string' || lastName.trim().length < 2) {
        return res.status(400).json({
            message: 'Last name must be at least 2 characters'
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (typeof email !== 'string' || !emailRegex.test(email.trim())) {
        return res.status(400).json({
            message: 'Enter a valid email address'
        });
    }

    if (phoneNumber !== undefined && phoneNumber !== '') {
        const phoneRegex = /^\+?[1-9]\d{7,14}$/;

        if (typeof phoneNumber !== 'string' || !phoneRegex.test(phoneNumber.trim())) {
            return res.status(400).json({
                message: 'Enter a valid phone number'
            });
        }
    }

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (typeof password !== 'string' || !passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters and contain uppercase, lowercase, number, and special character'
        });
    }

    next();
};