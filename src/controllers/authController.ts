import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { IUser, User } from '../models/user.model';
import { generateToken } from '../utils/generateToken';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            res.status(400).json({ success: false, message: 'All fields are required' });
        } else if(role === "Admin"){
            res.status(400).json({
                success: false,
                message: "You can't create admin profile. Please login if you are an admin",
            });
        }

        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userExists:any = await User.findOne({ email });

            if (userExists) {
                res.status(400).json({ success: false, message: 'User already exists! Please login' });
            }  else {
                const user:any = await User.create({ name, email, password: hashedPassword, role } as IUser);
                const token = generateToken(String(user._id), user.role);

                res.status(201).json({
                    success: true,
                    message: 'User registered successfully',
                    data: user,
                    token
                });
            }
        }
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user:any = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        } else {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            } else {
                const token = generateToken(String(user._id), user.role);

                res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    token
                });
            }
        }
    } catch (error) {
        next(error);
    }
};
