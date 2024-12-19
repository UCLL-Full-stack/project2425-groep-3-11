import Head from 'next/head';
import ProductsOverview from '@components/product/productsOverview';
import Header from '@components/header';
import ShoppingCartOverview from '@components/shoppingcart/shoppingCartOverview';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const ShoppingCartPage = () => {
    return (
        <>
            <Header />

            <main>
                <ShoppingCartOverview />
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
