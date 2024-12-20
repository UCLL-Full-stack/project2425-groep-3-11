import express, { NextFunction, Request, Response } from 'express';
import reviewService from '../service/review.service';

const reviewRouter = express.Router();

/**
 * @swagger
 * swagger: "2.0"
 * info:
 *   description: "Review management API"
 *   version: "1.0.0"
 *   title: "Review API"
 * paths:
 *   /review/{productId}/{userId}:
 *     post:
 *       summary: "Create a review for a product"
 *       description: "Create a review for a product by a specific user."
 *       operationId: "createReviewForProduct"
 *       tags:
 *         - "Reviews"
 *       parameters:
 *         - name: "productId"
 *           in: "path"
 *           description: "ID of the product"
 *           required: true
 *           type: "integer"
 *           format: "int64"
 *         - name: "userId"
 *           in: "path"
 *           description: "ID of the user creating the review"
 *           required: true
 *           type: "integer"
 *           format: "int64"
 *         - name: "review"
 *           in: "body"
 *           description: "Review data"
 *           required: true
 *           schema:
 *             $ref: "#/definitions/Review"
 *       responses:
 *         201:
 *           description: "Review created successfully"
 *           schema:
 *             $ref: "#/definitions/Review"
 *         400:
 *           description: "Invalid input"
 *         500:
 *           description: "Internal server error"
 * 
 *   /product/{productId}/reviews:
 *     get:
 *       summary: "Get all reviews for a product"
 *       description: "Fetch all reviews for a specific product."
 *       operationId: "getReviewsForProduct"
 *       tags:
 *         - "Reviews"
 *       parameters:
 *         - name: "productId"
 *           in: "path"
 *           description: "ID of the product"
 *           required: true
 *           type: "integer"
 *           format: "int64"
 *       responses:
 *         200:
 *           description: "A list of reviews for the product"
 *           schema:
 *             type: array
 *             items:
 *               $ref: "#/definitions/Review"
 *         404:
 *           description: "No reviews found for the product"
 *         500:
 *           description: "Internal server error"
 * 
 * definitions:
 *   Review:
 *     type: "object"
 *     properties:
 *       id:
 *         type: "integer"
 *         format: "int64"
 *       score:
 *         type: "integer"
 *         description: "Rating score for the product (1-5)"
 *       comment:
 *         type: "string"
 *         description: "Review comment"
 *       date:
 *         type: "string"
 *         format: "date-time"
 *         description: "Date the review was created"
 *       user:
 *         $ref: "#/definitions/User"
 *       product:
 *         $ref: "#/definitions/Product"
 * 
 *   User:
 *     type: "object"
 *     properties:
 *       id:
 *         type: "integer"
 *         format: "int64"
 *       name:
 *         type: "string"
 *       email:
 *         type: "string"
 *         format: "email"
 * 
 *   Product:
 *     type: "object"
 *     properties:
 *       id:
 *         type: "integer"
 *         format: "int64"
 *       name:
 *         type: "string"
 *       price:
 *         type: "number"
 *         format: "float"
 *       description:
 *         type: "string"
 *       stock:
 *         type: "integer"
 */

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

reviewRouter.get('/product/:productId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = parseInt(req.params.productId);
        const reviews = await reviewService.getReviewsForProduct(productId);
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});
export { reviewRouter };
