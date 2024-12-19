import '@styles/globals.css'
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Prata&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Component {...pageProps} />;
        </>
    );
}

export default appWithTranslation(App);
