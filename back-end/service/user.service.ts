import bcrypt from 'bcrypt';
import { User } from '../model/user';
import { AuthenticationResponse, UserInput } from '../types';
import userDB from '../repository/user.db';
import { generateJwtToken } from '../util/jwt';

const createUser = async ({ username, password, email, role }: UserInput): Promise<User> => {
    const existing = await userDB.getUserByUsername({ username });
    if (existing) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        username: username,
        password: hashedPassword,
        email: email,
        role: role,
    });
    return userDB.createUser(user);
};
const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        role: user.getRole(),
    };
};

export default { createUser, authenticate, getUserByUsername };
