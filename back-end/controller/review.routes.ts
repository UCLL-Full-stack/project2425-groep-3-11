import express, { NextFunction, Request, Response } from 'express';
import reviewService from '../service/review.service';

const reviewRouter = express.Router();

reviewRouter.post(
    '/review/:productId/:userId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const review = req.body;
            const productId = parseInt(req.params.productId);
            const userId = parseInt(req.params.userId);
            const newReview = await reviewService.createReviewForProduct(productId, review, userId);
            res.status(201).json(newReview);
        } catch (error) {
            next(error);
        }
    }
);
export { reviewRouter };
