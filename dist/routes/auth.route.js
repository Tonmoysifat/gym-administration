"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validation_util_1 = require("../utils/validation.util");
exports.authRoute = express_1.default.Router();
exports.authRoute.post('/create-member', (0, validation_util_1.validateInput)(['name', 'email', 'password', 'role']), authController_1.register);
exports.authRoute.post('/login', (0, validation_util_1.validateInput)(['email', 'password']), authController_1.login);
