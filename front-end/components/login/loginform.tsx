import React, { useState } from 'react';

const Loginform: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleToggle = () => {
        setIsLogin((prev) => !prev);
    };

    const handleLoginSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Login form submitted');
    };

    const handleRegisterSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Register form submitted');
    };

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
                        <input type="text" placeholder="Username" style={styles.input} />
                        <input type="password" placeholder="Password" style={styles.input} />
                        <button type="submit" style={styles.submitButton}>
                            Log in
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit} style={styles.form}>
                        <input type="text" placeholder="Username" style={styles.input} />
                        <input type="email" placeholder="Email" style={styles.input} />
                        <input type="password" placeholder="Password" style={styles.input} />
                        <button type="submit" style={styles.submitButton}>
                            Register
                        </button>
                    </form>
                )}
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
};

export default Loginform;
