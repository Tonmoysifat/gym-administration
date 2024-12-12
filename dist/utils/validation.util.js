"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const validateInput = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter((field) => !req.body[field]);
        const emptyFields = requiredFields.filter((field) => { var _a; return ((_a = req.body[field]) === null || _a === void 0 ? void 0 : _a.trim()) === ''; });
        const invalidEmails = requiredFields
            .filter((field) => field.toLowerCase().includes('email') && req.body[field])
            .filter((field) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body[field]));
        if (missingFields.length > 0) {
            res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`,
            });
        }
        else if (emptyFields.length > 0) {
            res.status(400).json({
                success: false,
                message: `Empty fields are not allowed: ${emptyFields.join(', ')}`,
            });
        }
        else if (invalidEmails.length > 0) {
            res.status(400).json({
                "success": false,
                "message": "Validation error occurred.",
                "errorDetails": {
                    "field": "email",
                    "message": "Invalid email format."
                }
            });
        }
        else {
            next();
        }
    };
};
exports.validateInput = validateInput;
