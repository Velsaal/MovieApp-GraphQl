import { UserInputError } from 'apollo-server';
import prisma from '../db/prisma';
import { hashPassword, comparePassword } from './hash';
import { generateToken } from './jwt';

export async function registerUser(username: string, password: string) {
    if (!username || username.trim().length < 3) {
        throw new UserInputError('Username must be at least 3 characters long');
    }
    if (!password || password.length < 6) {
        throw new UserInputError('Password must be at least 6 characters long');
    }

    const existingUser = await prisma.user.findUnique({ 
        where: { username: username.trim() } 
    });
    if (existingUser) {
        throw new UserInputError('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({ 
        data: { username: username.trim(), password: hashedPassword } 
    });
    return user;
}

export async function loginUser(username: string, password: string) {
    if (!username || !password) {
        throw new UserInputError('Username and password are required');
    }

    const user = await prisma.user.findUnique({ 
        where: { username: username.trim() } 
    });
    if (!user) {
        throw new UserInputError('User not found');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) { 
        throw new UserInputError('Invalid password'); 
    }
    
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    const session = await prisma.session.create({
        data: {
            userId: user.id,
            token: '',
            expiresAt
        }
    });
    
    const token = generateToken(session.id);
    
    await prisma.session.update({
        where: { id: session.id },
        data: { token }
    });
    
    return token;
}

export async function logoutUser(sessionId: string) {
    try {
        await prisma.session.delete({
            where: { id: sessionId }
        });
        return true;
    } catch (error) {
        return false;
    }
}
