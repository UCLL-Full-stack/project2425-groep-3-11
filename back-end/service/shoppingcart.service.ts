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

export default { getShoppingCartById, getShoppingCartByUserId, getShoppingCartByUsername };
