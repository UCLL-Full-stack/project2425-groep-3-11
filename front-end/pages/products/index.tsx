import Head from 'next/head';
import ProductsOverview from '@components/product/productsOverview';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const ProductIndexPage = () => {
    return (
        <>
            <Header />
            <Head>
                <title>Product List</title>
            </Head>

            <main className="d-flex flex-column align-items-center">
                <h1>Our Products</h1>
                <ProductsOverview />
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
export default ProductIndexPage;
