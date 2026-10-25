import * as userRepo from './user.repository.js';
import * as jwt from '../../util/jwt.js';
import { hashPassword, comparePassword } from '../../util/password.js';
import {
    NotFoundError,
    DuplicateResourceError,
    UnauthorizedError
} from '../../util/errors.js';

const toPublicUser = (user) => ({
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber
});

const login = async ({ email, password }) => {
    const user = await userRepo.getUserForLogin(email);
    if (!user || !(await comparePassword(password, user.password))) {
        throw new UnauthorizedError('Invalid email or password');
    }

    const token = jwt.signToken({
        userId: user._id.toString(),
        email: user.email
    });

    return { token, user: toPublicUser(user) };
};

const getUser = async (userId) => {
    const user = await userRepo.getUser(userId);
    if (!user) throw new NotFoundError('User');
    return toPublicUser(user);
};

const addUser = async (userData) => {
    const normalizedEmail = userData.email.trim().toLowerCase();

    if (await userRepo.getUserByEmail(normalizedEmail)) {
        throw new DuplicateResourceError('Email already exists');
    }

    const phoneNumber = userData.phoneNumber?.trim();
    if (phoneNumber && await userRepo.getUserByPhoneNumber(phoneNumber)) {
        throw new DuplicateResourceError('Phone number already exists');
    }

    const user = await userRepo.createUser({
        ...userData,
        email: normalizedEmail,
        ...(phoneNumber ? { phoneNumber } : {}),
        password: await hashPassword(userData.password)
    });

    const token = jwt.signToken({
        userId: user._id.toString(),
        email: user.email
    });

    return { token, userDetails: toPublicUser(user) };
};

export { login, getUser, addUser };
