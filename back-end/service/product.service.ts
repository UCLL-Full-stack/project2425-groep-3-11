import { Product } from '../model/product';
import { Review } from '../model/review';
import productDb from '../repository/product.db';

const getAllProducts = async (): Promise<Product[]> => {
    return productDb.getAllProducts();
};

const getProductById = async ({ id }: { id: number }): Promise<Product | null> => {
    const product = productDb.getProductById({ id });
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};

const getReviewsForProduct = async ({ id }: { id: number }): Promise<Review[]> => {
    const reviews = productDb.getReviewsForProduct({ id });
    if (!reviews) {
        throw new Error('Reviews not found');
    }
    return reviews;
};

const createProduct = async (product: Product): Promise<Product> => {
    return productDb.createProduct(product);
};
export default { getAllProducts, getProductById, getReviewsForProduct, createProduct };
