import { Review } from '../model/review';
import productDb from '../repository/product.db';
import reviewDb from '../repository/review.db';

const createReviewForProduct = async (
    productId: number,
    review: Review,
    userId: number
): Promise<Review> => {
    const reviews = await reviewDb.createReviewForProduct(productId, review, userId);
    return reviews;
};

export default { createReviewForProduct };
