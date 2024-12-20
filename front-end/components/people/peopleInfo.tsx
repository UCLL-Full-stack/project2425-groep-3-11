import React from 'react';
import { User } from '@types';

const UserTable = ({ users }: { users: User[] }) => (
<div className="p-4"> 
  <table className="table-auto w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
        <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
      </tr>
    </thead>
    <tbody>
      {users.length > 0 ? (
        users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{user.username}</td>
            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
            <td className="border border-gray-300 px-4 py-2">{user.role}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td className="border border-gray-300 px-4 py-2" colSpan={3}>
            No users available.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

);

export default UserTable;
