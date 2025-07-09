import prisma from '../db/prisma';
import { hashPassword, comparePassword } from './hash';
import { generateToken } from './jwt';
import { registerValidation, loginValidation } from './authValidation';

export async function registerUser(username: string, password: string) {
    const { error } = registerValidation.validate({ username, password });
    if (error) {
        throw new Error('Validation error: ' + error.details[0].message);
    }

    const existingUser = await prisma.user.findUnique({ 
        where: { username } 
    });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({ 
        data: { username, password: hashedPassword } 
    });
    return user;
}

export async function loginUser(username: string, password: string) {
    const { error } = loginValidation.validate({ username, password });
    if (error) {
        throw new Error('Validation error: ' + error.details[0].message);
    }

    const user = await prisma.user.findUnique({ 
        where: { username } 
    });
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) { throw new Error('Invalid password'); }
    
    return generateToken(user.id);
}
