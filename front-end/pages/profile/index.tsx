import Head from 'next/head';
import Header from '@components/header';
import UserTable from '@components/people/peopleInfo';
import UserService from '@services/UserService';
import { useEffect, useState } from 'react';
import { User } from '@types';
import Link from 'next/link'; 

const PeopleInfo = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null); 
    const [isAuthorized, setIsAuthorized] = useState<boolean>(true); 

    useEffect(() => {
        const fetchUsers = async () => {
            let loggedInUser = sessionStorage.getItem('loggedInUser');
            const user = loggedInUser ? JSON.parse(loggedInUser) : null;

            if (!user || !user.username || user.role === 'guest') {
                setIsAuthorized(false); 
                setIsLoading(false);
                return;
            }

            try {
                const response = await UserService.getAllUsers({
                    username: user.username,
                    role: user.role,
                });

                setUsers(response);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <Header />
            <Head>
                <title>Info about Users</title>
            </Head>
            <main className="d-flex flex-column align-items-center">
                <h1>Info about Users</h1>
                {!isAuthorized ? (
                    <div className="text-center">
                        <p>This page can only be accessed with an account.</p>
                        <Link href="/login">
                            <button className="px-6 py-2 mt-4 bg-white text-black border border-gray-400 rounded-lg hover:bg-gray-100">
                                Please log in
                            </button>
                        </Link>
                    </div>
                ) : isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <UserTable users={users} />
                )}
            </main>
        </>
    );
};

export default PeopleInfo;
