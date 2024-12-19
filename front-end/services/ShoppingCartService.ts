import { ShoppingCart } from '@types';

const getShoppingCartById = (id: number) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingcart/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getShoppingCartByUserId = (userId: number) => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingcart/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const getShoppingCartByUsername = (username: string) => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingcart/username/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const addProductToCart = (cartId: number, productId: number) => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingcart/${cartId}/product/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const removeProductFromCart = (cartId: number, productId: number) => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingcart/${cartId}/product/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const clearShoppingCart = (id: number) => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingcart/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const changeProductQuantity = (cartId: number, productId: number, quantity: number) => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingcart/${cartId}/product/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
    });
};

const ShoppingCartService = {
    getShoppingCartById,
    getShoppingCartByUserId,
    getShoppingCartByUsername,
    addProductToCart,
    removeProductFromCart,
    clearShoppingCart,
    changeProductQuantity,
};

export default ShoppingCartService;
