import express from "express";
import {validateLogin} from './auth.validation.js';
import {loginUser} from "../user/user.controller.js";

export const authRouter = express.Router();

authRouter.post('/login',validateLogin, loginUser);