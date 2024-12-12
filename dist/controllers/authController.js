"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const generateToken_1 = require("../utils/generateToken");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            res.status(400).json({ success: false, message: 'All fields are required' });
        }
        else if (role === "Admin") {
            res.status(400).json({
                success: false,
                message: "You can't create admin profile. Please login if you are an admin",
            });
        }
        else {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const userExists = yield user_model_1.User.findOne({ email });
            if (userExists) {
                res.status(400).json({ success: false, message: 'User already exists! Please login' });
            }
            else {
                const user = yield user_model_1.User.create({ name, email, password: hashedPassword, role });
                const token = (0, generateToken_1.generateToken)(String(user._id), user.role);
                res.status(201).json({
                    success: true,
                    message: 'User registered successfully',
                    data: user,
                    token
                });
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        else {
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
            else {
                const token = (0, generateToken_1.generateToken)(String(user._id), user.role);
                res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    token
                });
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map