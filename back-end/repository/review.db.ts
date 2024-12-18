import { PrismaClient } from '@prisma/client';
import { Review } from '../model/review';

const prisma = new PrismaClient();

const createReviewForProduct = async (productId: number, reviewData: Review): Promise<Review> => {
    try {
        const product = await prisma.product.findUnique({ where: { id: productId } });

        if (!product) {
            throw new Error('Product not found');
        }

        const review = await prisma.review.create({
            data: {
                score: reviewData.getScore(),
                comment: reviewData.getComment(),
                date: reviewData.getDate(),
                product: { connect: { id: productId } },
                user: { connect: { id: reviewData.getUser().getId() } },
            },
            include: {
                product: true,
                user: true,
            },
        });

        return Review.from(review);
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Failed to create review: ' + error.message);
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};

const getAllReviews = async (): Promise<Review[]> => {
    try {
        const reviews = await prisma.review.findMany({
            include: {
                product: true,
                user: true,
            },
        });
        return reviews.map((review) => Review.from(review));
    } catch (error: unknown) {
        throw new Error('Failed to fetch reviews: ' + (error as Error).message);
    }
};

const getReviewsForProduct = async (productId: number): Promise<Review[]> => {
    try {
        const reviews = await prisma.review.findMany({
            where: { productId },
            include: {
                product: true,
                user: true,
            },
        });

        return reviews.map((review) => Review.from(review));
    } catch (error: unknown) {
        throw new Error('Failed to fetch reviews for product: ' + (error as Error).message);
    }
};

const getReviewsByUser = async (userId: number): Promise<Review[]> => {
    try {
        const reviews = await prisma.review.findMany({
            where: { userId },
            include: {
                product: true,
                user: true,
            },
        });

        return reviews.map((review) => Review.from(review));
    } catch (error: unknown) {
        throw new Error('Failed to fetch reviews by user: ' + (error as Error).message);
    }
};

const updateReview = async (reviewId: number, updatedData: Partial<Review>): Promise<Review> => {
    try {
        const updatedReview = await prisma.review.update({
            where: { id: reviewId },
            data: {
                score: updatedData.getScore?.(),
                comment: updatedData.getComment?.(),
                date: updatedData.getDate?.(),
            },
            include: {
                user: true,
                product: true,
            },
        });

        return Review.from(updatedReview);
    } catch (error: unknown) {
        throw new Error('Failed to update review: ' + (error as Error).message);
    }
};

const deleteReview = async (reviewId: number): Promise<void> => {
    try {
        await prisma.review.delete({
            where: { id: reviewId },
        });
    } catch (error: unknown) {
        throw new Error('Failed to delete review: ' + (error as Error).message);
    }
};

export default {
    createReviewForProduct,
    getAllReviews,
    getReviewsForProduct,
    getReviewsByUser,
    updateReview,
    deleteReview,
};
