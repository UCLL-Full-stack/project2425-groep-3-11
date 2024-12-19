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
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/shoppingcart/user/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

const ShoppingCartService = {
    getShoppingCartById,
    getShoppingCartByUserId,
    getShoppingCartByUsername,
};

export default ShoppingCartService;
