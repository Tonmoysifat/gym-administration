import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const generateToken = (userId: string,role:string): string => {
    return jwt.sign({id: userId,role:role}, process.env.JWT_SECRET || 'secret', {expiresIn: '24h'});
};
