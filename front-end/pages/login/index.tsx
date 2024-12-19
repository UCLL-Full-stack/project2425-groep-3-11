import Head from 'next/head';
import Header from '@components/header';
import Loginform from '@components/login/loginform';

const ProductIndexPage = () => {
    return (
        <>
            <Header />
            <Head>
                <title>Login</title>
            </Head>

            <main className="d-flex flex-column align-items-center">
                <h1>please login or register if you dont have an account yet</h1>
                <Loginform />
            </main>
        </>
    );
};

export default ProductIndexPage;
