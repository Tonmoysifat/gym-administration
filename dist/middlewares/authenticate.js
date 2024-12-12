"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// interface AuthPayload {
//     id: string;
//     role: string;
// }
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        res.status(401).json({ success: false, message: 'Unauthorized: Token missing' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.headers = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map