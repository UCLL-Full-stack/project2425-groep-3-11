import Head from 'next/head';
import Header from '@components/header';
import UserTable from '@components/people/peopleInfo';
import UserService from '@services/UserService';
import { useEffect, useState } from 'react';
import { User } from '@types';

const peopleInfo = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await UserService.getAllUsers();
                setUsers(response);
                console.log('Users:', response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <Header />
            <Head>
                <title>info about user </title>
            </Head>

            <main className="d-flex flex-column align-items-center">
                <h1>info about</h1>
                <UserTable users={users} />
            </main>
        </>
    );
};

export default peopleInfo;


