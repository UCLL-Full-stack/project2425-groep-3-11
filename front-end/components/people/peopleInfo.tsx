import React from 'react';
import { User } from '@types';

const UserTable = ({ users }: { users: User[] }) => (
    <table className="table">
        <thead>
            <tr>
                <th>Username</th>
                <th>Role</th>
            </tr>
        </thead>
        <tbody>
            {users.length > 0 ? (
                users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={2}>No users available.</td>
                </tr>
            )}
        </tbody>
    </table>
);

export default UserTable;
