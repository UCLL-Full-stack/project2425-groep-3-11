import { PrismaClient, Product as PrismaProduct, Review as PrismaReview } from '@prisma/client';
import { Product } from "../model/product";
import { Review } from "../model/review";

const prisma = new PrismaClient();

// Fetch a single product by ID (including reviews and shopping carts)
const getProductById = async ({ id }: { id: number }): Promise<Product | null> => {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                reviews: true,
                shoppingCarts: true, // Include Many-to-Many relation with ShoppingCarts
            },
        });

        if (!product) return null;

        return Product.from(product);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Fetch all products (including reviews and shopping carts)
const getAllProducts = async (): Promise<Product[]> => {
    try {
        const productsPrisma = await prisma.product.findMany({
            include: {
                reviews: true,
                shoppingCarts: true,
            },
        });

        return productsPrisma.map((productPrisma) => Product.from(productPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Create a new product
const createProduct = async (product: Product): Promise<Product> => {
    try {
        const createdProduct = await prisma.product.create({
            data: {
                name: product.getName(),
                price: product.getPrice(),
                description: product.getDescription(),
                stock: product.getStock(),
            },
        });

        return Product.from(createdProduct);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create product');
    }
};

// Fetch reviews for a product
const getReviewsForProduct = async ({ id }: { id: number }): Promise<Review[]> => {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: { 
                reviews: {
                    include: {
                        user: true,
                        product: true,
                    },
                },
            },
        });

        if (!product) {
            throw new Error('Product not found');
        }

        return product.reviews.map((review) => Review.from(review));
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching reviews');
    }
};

// Add a product to a shopping cart
const addProductToShoppingCart = async ({
    productId,
    cartId,
}: {
    productId: number;
    cartId: number;
}): Promise<void> => {
    try {
        await prisma.shoppingCart.update({
            where: { id: cartId },
            data: {
                products: {
                    connect: { id: productId }, // Connect product to shopping cart
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Error adding product to shopping cart');
    }
};

// Remove a product from a shopping cart
const removeProductFromShoppingCart = async ({
    productId,
    cartId,
}: {
    productId: number;
    cartId: number;
}): Promise<void> => {
    try {
        await prisma.shoppingCart.update({
            where: { id: cartId },
            data: {
                products: {
                    disconnect: { id: productId }, // Disconnect product from shopping cart
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Error removing product from shopping cart');
    }
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    getReviewsForProduct,
    addProductToShoppingCart,
    removeProductFromShoppingCart,
};
