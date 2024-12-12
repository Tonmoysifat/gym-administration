import express from 'express';
import {login, register} from "../controllers/authController";
import {validateInput} from "../utils/validation.util";

export const authRoute = express.Router();

authRoute.post('/create-member',validateInput(['name', 'email', 'password', 'role']),  register);
authRoute.post('/login',validateInput([ 'email', 'password']),  login);