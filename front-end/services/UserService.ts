import { User } from '@types';

const registerUser = async (userData: User) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`Failed to add review: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

const loginUser = async (user: User) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error(`Failed to login: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getAllUsers = async (userData: User) => {
    try {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/getUsers`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to get users: ${response.statusText}`);
        }

        const data = await response.json(); 
        console.log(data); 
        return data; 

    } catch (error) {
        console.error(error);
        return null;
    }
};


const getUserByUsername = async (username: string) => {
    try {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/username/${username}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to get user: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};
const UserService = {
    registerUser,
    loginUser,
    getUserByUsername,
    getAllUsers,
};

export default UserService;
