import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {IncomingHttpHeaders} from "node:http";

// interface AuthPayload {
//     id: string;
//     role: string;
// }

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token:any = req.headers?.token;

    if (!token) {
         res.status(401).json({ success: false, message: 'Unauthorized: Token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IncomingHttpHeaders;
        req.headers = decoded;
        next();
    } catch (error) {
         res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
};
