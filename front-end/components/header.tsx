import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // useEffect(() => {
      
    //   if (token) {
        
    //     const decoded = jwt.decode(token) as ProfileProps;
          
    //     if (decoded && decoded.name) {
    //       setIsLoggedIn(true);
    //       setUserName(decoded.name);
    //     }
        
    //   }
    // }, []);

    const handleLogout = () => {};

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
                        </Link>{' '}
                <nav className="nav justify-content-center">
                              <Link href="/products" className="nav-link px-4 fs-5 text-black">
                                    Products
                              </Link>
                              <Link href="/shoppingcart" className="nav-link px-4 fs-5 text-black">
                                    Shopping Cart
                              </Link>
                        </nav>
                <div className="relative">
                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="px-4 text-xl text-white hover:bg-gray-600 rounded-lg"
                            >
                                {userName}
                            </button>
                            {dropdownVisible && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    >
                                        Profile
                                    </Link>
                                    
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
                  </div>
            </header>
      );
};

export default Header;
