import { PrismaClient, User as UserPrisma } from '@prisma/client';
import { User } from '../model/user';
import database from '../util/database';

const prisma = new PrismaClient();

const createUser = async (userData: User): Promise<User> => {
    try {
        const createdUser = await prisma.user.create({
            data: {
                username: userData.getUsername(),
                email: userData.getEmail(),
                password: userData.getPassword(),
                role: userData.getRole(),
            },
        });
        return User.from(createdUser);
    } catch (error: unknown) {
        throw new Error(
            'Failed to create user: ' + (error instanceof Error ? error.message : 'Unknown error')
        );
    }
};

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userRecord = await prisma.user.findUnique({
            where: { id },
        });
        return userRecord ? User.from(userRecord) : null;
    } catch (error: unknown) {
        throw new Error(
            'Failed to fetch user: ' + (error instanceof Error ? error.message : 'Unknown error')
        );
    }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userRecord = await prisma.user.findUnique({
            where: { email },
        });
        return userRecord ? User.from(userRecord) : null;
    } catch (error: unknown) {
        throw new Error(
            'Failed to fetch user: ' + (error instanceof Error ? error.message : 'Unknown error')
        );
    }
};

const updateUser = async (id: number, updatedData: Partial<UserPrisma>): Promise<User | null> => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: updatedData,
        });
        return User.from(updatedUser);
    } catch (error: unknown) {
        if (error instanceof Error && error.message.includes('Record to update not found')) {
            return null; // User not found
        }
        throw new Error(
            'Failed to update user: ' + (error instanceof Error ? error.message : 'Unknown error')
        );
    }
};

const deleteUser = async (id: number): Promise<boolean> => {
    try {
        await prisma.user.delete({
            where: { id },
        });
        return true;
    } catch (error: unknown) {
        if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
            return false; // User not found
        }
        throw new Error(
            'Failed to delete user: ' + (error instanceof Error ? error.message : 'Unknown error')
        );
    }
};

const getAllUsers = async (): Promise<User[]> => {
    try {
        const users = await prisma.user.findMany();
        return users.map((userRecord) => User.from(userRecord));
    } catch (error: unknown) {
        throw new Error(
            'Failed to fetch users: ' + (error instanceof Error ? error.message : 'Unknown error')
        );
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { username },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
export default {
    createUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserByUsername,
};
