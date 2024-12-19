import Link from 'next/link';
import { useEffect, useState } from 'react';
import Language from './language/language';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        // Get properties from session storage
        const storedUsername = sessionStorage.getItem('username');
        const storedRole = sessionStorage.getItem('role');

        // Check if user is logged in based on stored data
        if (storedUsername && storedRole) {
            setIsLoggedIn(true);
            setUserName(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        // Clear session storage on logout
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserName('');
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <header className="p-3 mb-3 border-b bg-white">
            <div className="d-flex justify-content-between align-items-center mb-2 mb-lg-0">
                <Link href="/" className="nav-link px-4 fs-5 text-black">
                    <h1
                        className="fs-2 text-black cursor-pointer"
                        style={{ fontFamily: 'Prata, serif' }}
                    >
                        StuffStore
                    </h1>
                </Link>
                <nav className="nav justify-content-center">
                    <Link href="/products" className="nav-link px-4 fs-5 text-black">
                        Products
                    </Link>
                    <Link href="/cart" className="nav-link px-4 fs-5 text-black">
                        Cart
                    </Link>
                </nav>
                <div className="relative d-flex align-items-center">
                    {isLoggedIn ? (
                        <div className="relative d-flex align-items-center">
                            <span className="text-black me-3 text-sm">
                                You are logged in as <span className="fw-bold"></span>
                            </span>
                            <button
                                onClick={toggleDropdown}
                                className="px-4 text-xl text-white hover:bg-gray-600 rounded-lg"
                                style={{
                                    backgroundColor: '#333',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.375rem',
                                }}
                            >
                                {userName}
                            </button>
                            {dropdownVisible && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                    <Link
                                        href="/"
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="px-4 text-xl text-black hover:bg-gray-600 rounded-lg self-center"
                        >
                            Login
                        </Link>
                    )}
                </div>
                <Language />
            </div>
        </header>
    );
};

export default Header;
