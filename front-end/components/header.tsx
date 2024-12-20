import Link from 'next/link';
import { useEffect, useState } from 'react';
import Language from './language/language';

const Header: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        let loggedInUser = sessionStorage.getItem('loggedInUser');

        if (!loggedInUser) {
            loggedInUser = JSON.stringify({ username: '', role: 'guest' });
            sessionStorage.setItem('loggedInUser', loggedInUser);
        }

        const user = JSON.parse(loggedInUser);

        if (!user.role) {
            user.role = 'guest';
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        }

        setUserName(user.username || '');
        setUserRole(user.role || 'guest');
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('loggedInUser');
        setUserName('');
        setUserRole('guest');
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
                    <Link href="/shoppingcart" className="nav-link px-4 fs-5 text-black">
                        Shopping Cart
                    </Link>
                </nav>
                <div className="relative">
                    <div className="relative d-flex align-items-center">
                        <span className="text-black me-3 text-sm">
                            You are currently{' '}
                            {userRole === 'guest' ? 'a guest' : `logged in as ${userName}`}.
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
                            {userName || 'Guest'}
                        </button>
                        {dropdownVisible && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                {userRole !== 'guest' && (
                                    <>
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                        >
                                            Profile
                                        </Link>
                                    </>
                                )}
                                {userRole === 'guest' ? (
                                    <Link
                                        href="/login" // Redirects to the login page
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    >
                                        Login
                                    </Link>
                                ) : (
                                    <button
                                        onClick={handleLogout} // Calls handleLogout when clicked
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    >
                                        Logout
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <Language />
            </div>
        </header>
    );
};

export default Header;
