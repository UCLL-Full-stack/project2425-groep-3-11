import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Language from './language/language';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('guest');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false); // Hydration check
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();

    const { t } = useTranslation();

    useEffect(() => {
        setIsHydrated(true); // Indicate that the component has hydrated

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('loggedInUser');
        setUserName('');
        setUserRole('guest');
        router.push('/');
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    if (!isHydrated) {
        return null; // Avoid rendering until hydration is complete
    }

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
                        {t('nav.products')}
                    </Link>
                    <Link href="/shoppingcart" className="nav-link px-4 fs-5 text-black">
                        {t('nav.shoppingCart')}
                    </Link>
                </nav>
                <div className="relative">
                    <div className="relative d-flex align-items-center">
                        <span className="text-black me-3 text-sm">
                            {t('header.loggedInStatus', { role: userRole, name: userName })}
                        </span>
                        <button
                            ref={buttonRef}
                            onClick={toggleDropdown}
                            className="px-4 text-xl text-white hover:bg-gray-600 rounded-lg"
                            style={{
                                backgroundColor: '#333',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.375rem',
                            }}
                        >
                            {userName || t('header.guest')}
                        </button>
                        {dropdownVisible && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                            >
                                {userRole !== 'guest' && (
                                    <>
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                        >
                                            {t('dropdown.profile')}
                                        </Link>
                                    </>
                                )}
                                {userRole === 'guest' ? (
                                    <Link
                                        href="/login"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    >
                                        {t('dropdown.login')}
                                    </Link>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    >
                                        {t('dropdown.logout')}
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
