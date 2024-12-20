import React, { useState } from 'react';
import UserService from '@services/UserService';
import { useRouter } from 'next/router';

const Loginform: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    const handleToggle = () => {
        setIsLogin((prev) => !prev);
    };

    const handleLoginSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        if (!username || !password) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const user = { username, password };
            const response = await UserService.loginUser(user);

            if (response.token) {
                const { token, username: loggedInUsername, role } = response;

                sessionStorage.removeItem('loggedInUser');
                console.log('Login Response:', response);

                const loggedInUser = {
                    token: token,
                    username: loggedInUsername,
                    role: role,
                };

                sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                console.log('Logged in user:', loggedInUser);

                alert('Login successful!');
                router.push('/');
            } else {
                throw new Error(response.message || 'Invalid login response.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('Login failed. Please check your credentials or try again later.');
        }
    };

    const handleRegisterSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!username || !email || !password) {
            alert('Please fill in all required fields.');
            return;
        }

        const data = {
            username,
            email,
            password,
            role: 'user',
        };

        try {
            const response = await UserService.registerUser(data);

            if (response.token) {
                const { token, username: registeredUsername, role } = response;

                sessionStorage.setItem('token', token);
                sessionStorage.setItem('username', registeredUsername);
                sessionStorage.setItem('role', role);

                alert('Registration successful!');
                router.push('/');
            } else {
                throw new Error(response.message || 'Invalid registration response.');
            }
        } catch (error) {
            console.error('Registration Error:', error);
            alert('Registration failed. Please check your details or try again later.');
        }
    };

    // Sample data for table
    const users = [
        { username: 'milan', password: 'milanspassword', role: 'user' },
        { username: 'admin', password: 'adminspassword', role: 'admin' },
    ];

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>StuffStore</h1>
            <div style={styles.formContainer}>
                {/* Toggle Buttons */}
                <div style={styles.buttonGroup}>
                    <button
                        onClick={isLogin ? undefined : handleToggle}
                        disabled={isLogin}
                        style={{
                            ...styles.toggleButton,
                            ...styles.leftButton,
                            ...(isLogin ? styles.disabledButton : styles.activeButton),
                        }}
                    >
                        Log in
                    </button>
                    <button
                        onClick={!isLogin ? undefined : handleToggle}
                        disabled={!isLogin}
                        style={{
                            ...styles.toggleButton,
                            ...styles.rightButton,
                            ...(!isLogin ? styles.disabledButton : styles.activeButton),
                        }}
                    >
                        Register
                    </button>
                </div>

                {/* Form */}
                {isLogin ? (
                    <form onSubmit={handleLoginSubmit} style={styles.form}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            style={styles.input}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            style={styles.input}
                        />
                        <button type="submit" style={styles.submitButton}>
                            Log in
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit} style={styles.form}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            style={styles.input}
                        />
                        <input type="email" name="email" placeholder="Email" style={styles.input} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            style={styles.input}
                        />
                        <button type="submit" style={styles.submitButton}>
                            Register
                        </button>
                    </form>
                )}

                {/* User Data Table */}
                <h2 style={styles.tableHeader}>User Data</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeaderCell}>Username</th>
                            <th style={styles.tableHeaderCell}>Password</th>
                            <th style={styles.tableHeaderCell}>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} style={styles.tableRow}>
                                <td style={styles.tableCell}>{user.username}</td>
                                <td style={styles.tableCell}>{user.password}</td>
                                <td style={styles.tableCell}>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        width: '350px',
    },
    buttonGroup: {
        display: 'flex',
        marginBottom: '20px',
    },
    toggleButton: {
        flex: 1,
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    leftButton: {
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
    },
    rightButton: {
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px',
    },
    disabledButton: {
        backgroundColor: '#ccc',
        color: 'white',
        cursor: 'not-allowed',
    },
    activeButton: {
        backgroundColor: '#e0e0e0',
        color: 'black',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    submitButton: {
        padding: '10px',
        fontSize: '1rem',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    tableHeader: {
        marginTop: '30px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '10px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeaderCell: {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
        fontSize: '1rem',
    },
    tableRow: {
        backgroundColor: '#f9f9f9',
    },
    tableCell: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left',
    },
};

export default Loginform;
