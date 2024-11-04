import Link from 'next/link';

const Header: React.FC = () => {
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
                </nav>
            </div>
        </header>
    );
};

export default Header;
