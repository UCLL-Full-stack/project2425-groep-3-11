import { PrismaClient } from '@prisma/client';
import { Shoppingcart } from '../model/shoppingcart';

const prisma = new PrismaClient();

// Fetch shopping cart by ID
const getShoppingCartById = async ({ id }: { id: number }): Promise<Shoppingcart | null> => {
    try {
        const shoppingCart = await prisma.shoppingCart.findUnique({
            where: { id },
            include: { products: true },
        });

        if (!shoppingCart) {
            return null;
        }

        return Shoppingcart.from(shoppingCart);
    } catch (error) {
        throw new Error('Failed to fetch shopping cart: ' + (error as Error).message);
    }
};


// Add a product to the shopping cart
const addProductToCart = async (cartId: number, productId: number): Promise<Shoppingcart> => {
    try {
        const updatedCart = await prisma.shoppingCart.update({
            where: { id: cartId },
            data: {
                products: {
                    connect: { id: productId },
                },
            },
            include: { products: true },
        });

        return Shoppingcart.from(updatedCart);
    } catch (error) {
        throw new Error('Failed to add product to cart: ' + (error as Error).message);
    }
};

// Remove a product from the shopping cart
const removeProductFromCart = async (cartId: number, productId: number): Promise<Shoppingcart> => {
    try {
        const updatedCart = await prisma.shoppingCart.update({
            where: { id: cartId },
            data: {
                products: {
                    disconnect: { id: productId },
                },
            },
            include: { products: true },
        });

        return Shoppingcart.from(updatedCart);
    } catch (error) {
        throw new Error('Failed to remove product from cart: ' + (error as Error).message);
    }
};

// Clear all products from the shopping cart
const clearShoppingCart = async (cartId: number): Promise<Shoppingcart> => {
    try {
        const updatedCart = await prisma.shoppingCart.update({
            where: { id: cartId },
            data: {
                products: {
                    set: [], // Disconnect all products
                },
            },
            include: { products: true },
        });

        return Shoppingcart.from(updatedCart);
    } catch (error) {
        throw new Error('Failed to clear shopping cart: ' + (error as Error).message);
    }
};

// Delete a shopping cart
const deleteShoppingCart = async (cartId: number): Promise<void> => {
    try {
        await prisma.shoppingCart.delete({
            where: { id: cartId },
        });
    } catch (error) {
        throw new Error('Failed to delete shopping cart: ' + (error as Error).message);
    }
};

export default {
    getShoppingCartById,
    addProductToCart,
    removeProductFromCart,
    clearShoppingCart,
    deleteShoppingCart,
};
