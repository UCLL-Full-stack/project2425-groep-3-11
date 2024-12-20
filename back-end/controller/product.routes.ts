import express, { NextFunction, Request, Response } from 'express';
import productService from '../service/product.service';


const productRouter = express.Router();

/**
 * @swagger
 * swagger: "2.0"
 * info:
 *   description: "Product management API"
 *   version: "1.0.0"
 *   title: "Product API"
 * paths:
 *   /products:
 *     get:
 *       summary: "Get all products"
 *       description: "Fetch a list of all products."
 *       operationId: "getAllProducts"
 *       tags:
 *         - "Products"
 *       responses:
 *         200:
 *           description: "A list of products"
 *           schema:
 *             type: array
 *             items:
 *               $ref: "#/definitions/Product"
 *         500:
 *           description: "Internal server error"
 *   /products/{id}:
 *     get:
 *       summary: "Get a product by ID"
 *       description: "Fetch a product by its ID."
 *       operationId: "getProductById"
 *       tags:
 *         - "Products"
 *       parameters:
 *         - name: "id"
 *           in: "path"
 *           description: "ID of the product"
 *           required: true
 *           type: "integer"
 *           format: "int64"
 *       responses:
 *         200:
 *           description: "A product object"
 *           schema:
 *             $ref: "#/definitions/Product"
 *         404:
 *           description: "Product not found"
 *         500:
 *           description: "Internal server error"
 *   /products/{id}/reviews:
 *     get:
 *       summary: "Get reviews for a product"
 *       description: "Fetch reviews for a specific product."
 *       operationId: "getReviewsForProduct"
 *       tags:
 *         - "Products"
 *       parameters:
 *         - name: "id"
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
 *           description: "Reviews not found for product"
 *         500:
 *           description: "Internal server error"
 * definitions:
 *   Product:
 *     type: "object"
 *     properties:
 *       id:
 *         type: "integer"
 *         format: "int64"
 *       name:
 *         type: "string"
 *         description: "Name of the product"
 *       price:
 *         type: "number"
 *         format: "float"
 *         description: "Price of the product"
 *       description:
 *         type: "string"
 *         description: "Description of the product"
 *       stock:
 *         type: "integer"
 *         description: "Stock quantity of the product"
 *       quantity:
 *         type: "integer"
 *         default: 1
 *         description: "Quantity of the product"
 *   Review:
 *     type: "object"
 *     properties:
 *       id:
 *         type: "integer"
 *         format: "int64"
 *       productId:
 *         type: "integer"
 *         format: "int64"
 *         description: "ID of the product"
 *       rating:
 *         type: "integer"
 *         description: "Rating given to the product"
 *       comment:
 *         type: "string"
 *         description: "Review comment"
 *       date:
 *         type: "string"
 *         format: "date-time"
 *         description: "Date when the review was made"
 */



productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const products = await productService.getAllProducts();
        res.status(200).json(products);

    }catch(error){
        next(error);
    }
});

productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const product = await productService.getProductById({id: parseInt(req.params.id)});
        res.status(200).json(product);

    }catch(error){
        next(error);
    }
});

productRouter.get('/:id/reviews', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const reviews = await productService.getReviewsForProduct({id: parseInt(req.params.id)});
        res.status(200).json(reviews);

    }catch(error){
        next(error);
    }
});
export { productRouter };