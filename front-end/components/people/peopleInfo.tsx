import React from 'react';
import { User } from '@types'; 

const UserTable: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <div className="container mt-4">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
