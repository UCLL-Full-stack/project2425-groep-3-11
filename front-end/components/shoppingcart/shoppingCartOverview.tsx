import ShoppingCartService from '@services/ShoppingCartService';
import { Product, ShoppingCart } from '@types';
import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

interface ProductWithQuantity extends Product {
    quantity: number;
}

const ShoppingCartOverview = () => {
    const [shoppingcart, setShoppingcart] = useState<ShoppingCart | null>(null);
    const [productsWithQuantity, setProductsWithQuantity] = useState<ProductWithQuantity[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<String | null>(null);

    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    const parsedLoggedInUser = loggedInUserString ? JSON.parse(loggedInUserString) : null;

    const { t } = useTranslation();

    useEffect(() => {
        const storedUser = sessionStorage.getItem('loggedInUser');
        if (storedUser) {
            try {
                setLoggedInUser(JSON.parse(storedUser));
                console.log('logged in user:', loggedInUser);
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                setLoggedInUser(null);
            }
        }
    }, []);

    const fetchShoppingCart = async () => {
        try {
            console.log('logged in user:', loggedInUser); // Parse and set the user
            const loggedInUserString = sessionStorage.getItem('loggedInUser');
            if (!loggedInUser) {
                console.error('No user is logged in.');
                return;
            }

            const parsedLoggedInUser = loggedInUserString ? JSON.parse(loggedInUserString) : null;
            const shoppingCartResponse = await ShoppingCartService.getShoppingCartByUsername(
                parsedLoggedInUser.username
            );
            console.log('Parsed logged in user:', parsedLoggedInUser);
            const shoppingCartData = await shoppingCartResponse.json();
            if (shoppingCartData) {
                setShoppingcart(shoppingCartData);

                const productQuantityMap = shoppingCartData.products.reduce(
                    (acc: Record<number, ProductWithQuantity>, product: Product) => {
                        if (product.id !== undefined && acc[product.id]) {
                            acc[product.id].quantity += 1;
                        } else {
                            if (product.id !== undefined) {
                                acc[product.id] = { ...product, quantity: 1 };
                            }
                        }
                        return acc;
                    },
                    {}
                );

                setProductsWithQuantity(Object.values(productQuantityMap));
            }
            console.log('Shopping cart:', shoppingCartData);
        } catch (error) {
            console.error('Failed to fetch shopping cart:', error);
        }
    };
    const handleCheckout = async () => {
        const shoppingCartResponse = await ShoppingCartService.getShoppingCartByUsername(
            parsedLoggedInUser.username
        );
        const shoppingcart = await shoppingCartResponse.json();
        if (shoppingcart) {
            try {
                if (shoppingcart.id !== undefined) {
                    await ShoppingCartService.clearShoppingCart(shoppingcart.id);
                } else {
                    console.error('Shopping cart ID is undefined.');
                }
                alert('Checkout successful! Your cart has been cleared.');
                router.push('/'); // Redirect to the home page
            } catch (error) {
                console.error('Failed to clear shopping cart:', error);
                alert('An error occurred while checking out. Please try again.');
            }
        }
    };

    const removeProductFromCart = async (productId: number) => {
        const shoppingCartResponse = await ShoppingCartService.getShoppingCartByUsername(
            parsedLoggedInUser.username
        );
        const shoppingcart = await shoppingCartResponse.json();
        if (shoppingcart && shoppingcart.id) {
            try {
                await ShoppingCartService.removeProductFromCart(shoppingcart.id, productId);
                alert('Product removed successfully.');
                fetchShoppingCart(); // Fetch the updated shopping cart after removal
            } catch (error) {
                console.error('Failed to remove product:', error);
                alert('An error occurred while removing the product. Please try again.');
            }
        }
    };
    useEffect(() => {
        if (loggedInUser) {
            fetchShoppingCart();
        }
    }, [loggedInUser]);

    return (
        <div className="shopping-cart-container">
            {shoppingcart && (
                <div className="flex justify-center px-4">
                    <div className="max-w-5xl w-full">
                        <h1 className="text-3xl font-bold mb-4">{t('shoppingCart.title')}</h1>
                        <div className="grid gap-10 grid-cols-1 lg:grid-cols-3">
                            <div className="cart-items lg:col-span-2">
                                {productsWithQuantity.map((product) => (
                                    <div
                                        key={product.id}
                                        className="cart-item flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg shadow-sm relative"
                                    >
                                        <button
                                            onClick={() =>
                                                product.id !== undefined &&
                                                removeProductFromCart(product.id)
                                            }
                                            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                        >
                                            &#10005;
                                        </button>
                                        <div className="item-details">
                                            <h2 className="font-semibold">{product.name}</h2>
                                            <p className="text-gray-600">pcs: {product.quantity}</p>
                                        </div>
                                        <span className="item-price text-lg font-semibold">
                                            €{product.price.toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="order-summary p-4 bg-gray-200 rounded-lg shadow-sm lg:col-span-1">
                                <h2 className="font-bold text-lg mb-2">
                                    {t('shoppingCart.orderSummary')}
                                </h2>
                                <ul>
                                    <li className="flex justify-between">
                                        <span>{t('shoppingCart.subtotal')}:</span>
                                        <span>
                                            €{shoppingcart.totalPrice?.toFixed(2) || '0.00'}
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>{t('shoppingCart.shipping')}:</span>
                                        <span>€4.00</span>
                                    </li>
                                    <li className="flex justify-between font-bold text-lg">
                                        <span>{t('shoppingCart.total')}:</span>
                                        <span>
                                            €
                                            {(shoppingcart.totalPrice
                                                ? shoppingcart.totalPrice + 4.0
                                                : 4.0
                                            ).toFixed(2)}
                                        </span>
                                    </li>
                                </ul>
                                <button
                                    className="checkout-btn bg-black text-white px-4 py-2 mt-4 w-full rounded"
                                    onClick={handleCheckout}
                                >
                                    {t('shoppingCart.checkoutButton')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCartOverview;
