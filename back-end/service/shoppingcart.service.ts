import { Shoppingcart } from '../model/shoppingcart';
import shoppingcartDb from '../repository/shoppingcart.db';

const getShoppingCartById = async ({ id }: { id: number }): Promise<Shoppingcart | null> => {
    const shoppingCart = shoppingcartDb.getShoppingCartById({ id });
    if (!shoppingCart) {
        throw new Error('Shoppingcart not found');
    }
    return shoppingCart;
};

const getShoppingCartByUserId = async ({
    userId,
}: {
    userId: number;
}): Promise<Shoppingcart | null> => {
    const shoppingCart = shoppingcartDb.getShoppingCartByUserId({ userId });
    if (!shoppingCart) {
        throw new Error('Shoppingcart not found');
    }
    return shoppingCart;
};

const getShoppingCartByUsername = async ({
    username,
}: {
    username: string;
}): Promise<Shoppingcart | null> => {
    const shoppingCart = shoppingcartDb.getShoppingCartByUsername({ username });
    if (!shoppingCart) {
        throw new Error('Shoppingcart not found');
    }
    return shoppingCart;
};

const addProductToCart = async (
    cartId: number,
    productId: number
): Promise<Shoppingcart | null> => {
    const shoppingCart = shoppingcartDb.addProductToCart(cartId, productId);
    if (!shoppingCart) {
        throw new Error('Failed to add product to shopping cart');
    }
    return shoppingCart;
};

const removeProductFromCart = async (
    cartId: number,
    productId: number
): Promise<Shoppingcart | null> => {
    const shoppingCart = shoppingcartDb.removeProductFromCart(cartId, productId);
    if (!shoppingCart) {
        throw new Error('Failed to remove product from shopping cart');
    }
    return shoppingCart;
};

const clearShoppingCart = async ({ id }: { id: number }): Promise<Shoppingcart | null> => {
    const shoppingCart = shoppingcartDb.clearShoppingCart(id);
    if (!shoppingCart) {
        throw new Error('Failed to clear shopping cart');
    }
    return shoppingCart;
};
export default {
    getShoppingCartById,
    getShoppingCartByUserId,
    getShoppingCartByUsername,
    addProductToCart,
    removeProductFromCart,
    clearShoppingCart,
};
