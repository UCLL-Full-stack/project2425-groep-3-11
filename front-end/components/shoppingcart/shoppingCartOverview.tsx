import ShoppingCartService from '@services/ShoppingCartService';
import { Product, ShoppingCart } from '@types';
import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import QuantityDropdown from '@components/quantityDropdown';
import useSWR from 'swr';

interface ProductWithQuantity extends Product {
    quantity: number;
}

const ShoppingCartOverview = () => {
    const [shoppingcart, setShoppingcart] = useState<ShoppingCart | null>(null);
    const [productsWithQuantity, setProductsWithQuantity] = useState<ProductWithQuantity[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    const { t } = useTranslation();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const loggedInUserString = sessionStorage.getItem('loggedInUser');
            const parsedLoggedInUser = loggedInUserString ? JSON.parse(loggedInUserString) : null;
            setLoggedInUser(parsedLoggedInUser);
            console.log('parsedLoggedInUser:', parsedLoggedInUser);
        }
    }, []);

    const fetchShoppingCart = async () => {
        try {
            if (!loggedInUser) {
                console.error('No user is logged in.');
                return;
            }
            const loggedInUserString = sessionStorage.getItem('loggedInUser');
            const parsedLoggedInUser = loggedInUserString ? JSON.parse(loggedInUserString) : null;
            const shoppingCartResponse = await ShoppingCartService.getShoppingCartByUsername(
                parsedLoggedInUser.username
            );
            const shoppingCartData = await shoppingCartResponse.json();
            if (shoppingCartData) {
                setShoppingcart(shoppingCartData);
                const productsWithUpdatedQuantity = shoppingCartData.products.map(
                    (product: ProductWithQuantity) => ({
                        ...product,
                        quantity: product.quantity || 1,
                    })
                );
                setProductsWithQuantity(productsWithUpdatedQuantity);
            }
        } catch (error) {
            console.error(t('shoppingCart.fetchError'), error);
        }
    };

    const handleCheckout = async () => {
        try {
            if (shoppingcart?.id) {
                await ShoppingCartService.clearShoppingCart(shoppingcart.id);
                alert(t('shoppingCart.checkoutSuccess'));
                router.push('/');
            } else {
                console.error(t('shoppingCart.checkoutError'));
            }
        } catch (error) {
            console.error(t('shoppingCart.checkoutError'), error);
            alert(t('shoppingCart.tryAgain'));
        }
    };

    const removeProductFromCart = async (productId: number) => {
        try {
            if (shoppingcart?.id) {
                await ShoppingCartService.removeProductFromCart(shoppingcart.id, productId);
                alert(t('shoppingCart.productRemoved'));
                fetchShoppingCart();
            }
        } catch (error) {
            console.error(t('shoppingCart.removeError'), error);
            alert(t('shoppingCart.tryAgain'));
        }
    };


    // const {data, isLoading, error} = useSWR("shoppingcart", fetchShoppingCart);
    useEffect(() => {
        if (loggedInUser) {
            fetchShoppingCart();
        }
    }, [loggedInUser]);

    const refreshShoppingCart = () => {
        fetchShoppingCart();
    }
    return (
        <div className="shopping-cart-container">
            {shoppingcart && (
        <div className="flex justify-center px-4">
            <div className="max-w-5xl w-full">
                <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
                <div className="grid gap-10 grid-cols-1 lg:grid-cols-3">
                    
                    <div className="cart-items lg:col-span-2">
                        {productsWithQuantity.map((product) => (
                            <div key={product.id} className="cart-item flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg shadow-sm relative">
                                <button
                                    onClick={() => product.id !== undefined && removeProductFromCart(product.id)}
                                    className="absolute top-2 right-2 text-gray-700 hover:text-red-600"
                                >
                                    &#10005; {/* kruis icoon */}
                                </button>
                                <div className="item-details">
                                    <h2 className="font-semibold">{product.name}</h2>
                                    {shoppingcart.id && product.id &&(<QuantityDropdown
                                                cartId={shoppingcart.id}  
                                                productId={product.id}   
                                                quantity={product.quantity}  
                                                stock={product.stock} 
                                                onQuantityChange={refreshShoppingCart}
                                            />)}
                                </div>
                                <span className="item-price text-lg font-semibold">€{(product.price * product.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="order-summary p-4 bg-gray-200 rounded-lg shadow-sm lg:col-span-1">
                        <h2 className="font-bold text-lg mb-2">Order Summary</h2>
                        <ul>
                            <li className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>€{shoppingcart.totalPrice?.toFixed(2) || "0.00"}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Shipping:</span>
                                <span>€4.00</span>
                            </li>
                            <li className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>
                                    €{(shoppingcart.totalPrice ? shoppingcart.totalPrice + 4.0 : 4.0).toFixed(2)}
                                </span>
                            </li>
                        </ul>
                        <button className="checkout-btn bg-black text-white px-4 py-2 mt-4 w-full rounded" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
    </div>
</div>


            )}
        </div>
    );
};

export default ShoppingCartOverview;
