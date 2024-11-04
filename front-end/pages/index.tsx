// src/Home.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Header from '@components/header';

const Home: React.FC = () => {
    const router = useRouter();

    const handleExploreClick = () => {
        router.push('/products');
    };

    return (
        <>
            <Header />
            <main className="flex flex-col items-center justify-center h-screen p-4 text-center">
                <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Prata, serif' }}>
                    Welcome to StuffStore
                </h1>
                <h2 className="text-xl mb-2" style={{ fontFamily: 'Prata, serif' }}>
                    From Must-Haves to Nice-To-Haves,
                </h2>
                <h2 style={{ fontFamily: 'Prata, serif' }}>We've Got It!</h2>
                <button
                    onClick={handleExploreClick}
                    className="mt-4 px-6 py-3 bg-black text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                    Explore Our Products
                </button>
            </main>
        </>
    );
};

export default Home;
