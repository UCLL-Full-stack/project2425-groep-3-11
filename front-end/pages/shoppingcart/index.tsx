import ShoppingCartService from "@services/ShoppingCartService";
import { Product, ShoppingCart } from "@types";
import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";
import QuantityDropdown from "@components/quantityDropdown";
import useSWR from "swr";
import Header from "@components/header";
import ShoppingCartOverview from "@components/shoppingcart/shoppingCartOverview";

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import ShoppingCartOverview from '@components/shoppingcart/shoppingCartOverview';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const ShoppingCartPage = () => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');

        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUserRole(user.role || 'guest');
            setIsLoggedIn(!!user.username);
        } else {
            setUserRole(null);
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <>
            <Header />

            <main className="flex flex-col items-center p-6">
                {isLoggedIn && userRole !== 'guest' ? (
                    <ShoppingCartOverview />
                ) : (
                    <div className="text-center mt-10">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                            You need an account to access the shopping cart
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Please click the button below to login or register.
                        </p>
                        <Link href="/login">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Login
                            </button>
                        </Link>
                    </div>
                )}
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default ShoppingCartPage;
