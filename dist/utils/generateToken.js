"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ id: userId, role: role }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
};
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map