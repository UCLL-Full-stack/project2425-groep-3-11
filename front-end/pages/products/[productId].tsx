import Head from 'next/head';
// import Header if necessary
import { Product } from '@types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductService from '@services/ProductService';
import ProductInfo from '@components/product/productInfo';
import ReviewForm from '@components/review/addReviewForm';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const ReadProductById = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const router = useRouter();
    const { productId } = router.query;

    const getProductById = async () => {
        try {
            const productResponse = await ProductService.getProductById(productId as string);
            const productData = await productResponse.json();
            setProduct(productData);
        } catch (error) {
            console.error('Failed to fetch product:', error);
        }
    };

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUserRole(user.role || 'guest');
        } else {
            setUserRole('guest');
        }

        if (productId) getProductById();
    }, [productId]);

    const isUserAllowedToReview =
        userRole !== 'guest' && userRole !== null && userRole !== undefined;

    return (
        <>
            <Header />
            <Head>
                <title>Product Info</title>
            </Head>

            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Info about {product ? product.name : 'loading...'}</h1>
                {!product && <p>Loading...</p>}
                <section className="">
                    {product && <ProductInfo product={product} />}
                    {product && product.id !== undefined && isUserAllowedToReview && (
                        <ReviewForm
                            productId={product.id}
                            onAddReview={async (reviewData) => {
                                setTimeout(async () => {
                                    await getProductById();
                                }, 1500);
                            }}
                        />
                    )}
                </section>
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

export default ReadProductById;
