import { Request, Response, NextFunction } from 'express';

export const validateInput = (requiredFields: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const missingFields = requiredFields.filter((field) => !req.body[field]);
        const emptyFields = requiredFields.filter((field) => req.body[field]?.trim() === '');
        const invalidEmails = requiredFields
            .filter((field) => field.toLowerCase().includes('email') && req.body[field])
            .filter((field) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body[field]));

        if (missingFields.length > 0) {
            res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`,
            });
        } else if (emptyFields.length > 0) {
            res.status(400).json({
                success: false,
                message: `Empty fields are not allowed: ${emptyFields.join(', ')}`,
            });
        } else if (invalidEmails.length > 0) {
            res.status(400).json({
                "success": false,
                "message": "Validation error occurred.",
                "errorDetails": {
                    "field": "email",
                    "message": "Invalid email format."
                }

            });
        } else {
            next();
        }
    };
};
