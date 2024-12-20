    import express, { NextFunction, Request, Response } from 'express';
    import shoppingcartService from '../service/shoppingcart.service';

    const shoppingcartRouter = express.Router();

    /**
     * @swagger
     * info:
     *   description: "Shopping Cart management API"
     *   version: "1.0.0"
     *   title: "Shopping Cart API"
     * paths:
     *   /shoppingcart/{id}:
     *     get:
     *       summary: "Get shopping cart by ID"
     *       description: "Fetch a shopping cart by its unique ID."
     *       operationId: "getShoppingCartById"
     *       tags:
     *         - "Shopping Cart"
     *       parameters:
     *         - name: "id"
     *           in: "path"
     *           description: "ID of the shopping cart"
     *           required: true
     *           type: "integer"
     *           format: "int64"
     *       responses:
     *         200:
     *           description: "Shopping cart fetched successfully"
     *           schema:
     *             $ref: "#/definitions/Shoppingcart"
     *         404:
     *           description: "Shopping cart not found"
     *         500:
     *           description: "Internal server error"
     *   /shoppingcart/user/{userId}:
     *     get:
     *       summary: "Get shopping cart by user ID"
     *       description: "Fetch a shopping cart by user ID."
     *       operationId: "getShoppingCartByUserId"
     *       tags:
     *         - "Shopping Cart"
     *       parameters:
     *         - name: "userId"
     *           in: "path"
     *           description: "ID of the user"
     *           required: true
     *           type: "integer"
     *           format: "int64"
     *       responses:
     *         200:
     *           description: "Shopping cart fetched successfully"
     *           schema:
     *             $ref: "#/definitions/Shoppingcart"
     *         404:
     *           description: "Shopping cart not found for this user"
     *         500:
     *           description: "Internal server error"
     *   /shoppingcart/username/{username}:
     *     get:
     *       summary: "Get shopping cart by username"
     *       description: "Fetch a shopping cart by username."
     *       operationId: "getShoppingCartByUsername"
     *       tags:
     *         - "Shopping Cart"
     *       parameters:
     *         - name: "username"
     *           in: "path"
     *           description: "Username of the user"
     *           required: true
     *           type: "string"
     *       responses:
     *         200:
     *           description: "Shopping cart fetched successfully"
     *           schema:
     *             $ref: "#/definitions/Shoppingcart"
     *         404:
     *           description: "Shopping cart not found for this username"
     *         500:
     *           description: "Internal server error"
     *   /shoppingcart/{cartId}/product/{productId}:
     *     post:
     *       summary: "Add a product to the shopping cart"
     *       description: "Add a product to the shopping cart by product ID."
     *       operationId: "addProductToCart"
     *       tags:
     *         - "Shopping Cart"
     *       parameters:
     *         - name: "cartId"
     *           in: "path"
     *           description: "ID of the shopping cart"
     *           required: true
     *           type: "integer"
     *           format: "int64"
     *         - name: "productId"
     *           in: "path"
     *           description: "ID of the product"
     *           required: true
     *           type: "integer"
     *           format: "int64"
     *       responses:
     *         200:
     *           description: "Product added to the shopping cart"
     *           schema:
     *             $ref: "#/definitions/Shoppingcart"
     *         404:
     *           description: "Shopping cart or product not found"
     *         500:
     *           description: "Internal server error"
     *   /shoppingcart/{cartId}/product/{productId}/remove:
     *     delete:
     *       summary: "Remove a product from the shopping cart"
     *       description: "Remove a product from the shopping cart by product ID."
     *       operationId: "removeProductFromCart"
     *       tags:
     *         - "Shopping Cart"
     *       parameters:
     *         - name: "cartId"
     *           in: "path"
     *           description: "ID of the shopping cart"
     *           required: true
     *           type: "integer"
     *           format: "int64"
     *         - name: "productId"
     *           in: "path"
     *           description: "ID of the product"
     *           required: true
     *           type: "integer"
     *           format: "int64"
     *       responses:
     *         200:
     *           description: "Product removed from the shopping cart"
     *           schema:
     *             $ref: "#/definitions/Shoppingcart"
     *         404:
     *           description: "Shopping cart or product not found"
     *         500:
     *           description: "Internal server error"
     *   /shoppingcart/{id}/clear:
     *     delete:
     *       summary: "Clear the shopping cart"
     *       description: "Clear all products from the shopping cart."
     *       operationId: "clearShoppingCart"
     *       tags:
     *         - "Shopping Cart"
     *       parameters:
     *         - name: "id"
     *           in: "path"
     *           description: "ID of the shopping cart"
     *           required: true
     *           type: "integer"
     *           format: "int64"
     *       responses:
     *         200:
     *           description: "Shopping cart cleared successfully"
     *           schema:
     *             $ref: "#/definitions/Shoppingcart"
     *         404:
     *           description: "Shopping cart not found"
     *         500:
     *           description: "Internal server error"
     *   /shoppingcart/{cartId}/product/{productId}/quantity:
     *     put:
     *       summary: "Change the quantity of a product in the shopping cart"
     *       description: "Update the quantity of a product in the shopping cart."
     *       operationId: "changeProductQuantity"
     *       tags:
     *         - "Shopping Cart"
     *       parameters:
     *         - name: "cartId"
     *           in: "path"
     *           description: "ID of the shopping cart"
     *           required: true
     *           type: "integer"
     *           format: "int64"
     *         - name: "productId"
     *           in: "path"
     *           description: "ID of the product"
     *           required: true
     *           type: "integer"
     *           format: "int64"
     *         - name: "quantity"
     *           in: "body"
     *           description: "New quantity of the product"
     *           required: true
     *           schema:
     *             type: "object"
     *             properties:
     *               quantity:
     *                 type: "integer"
     *       responses:
     *         200:
     *           description: "Product quantity updated"
     *           schema:
     *             $ref: "#/definitions/Shoppingcart"
     *         404:
     *           description: "Shopping cart or product not found"
     *         400:
     *           description: "Invalid quantity"
     *         500:
     *           description: "Internal server error"
     * definitions:
     *   Shoppingcart:
     *     type: "object"
     *     properties:
     *       id:
     *         type: "integer"
     *         format: "int64"
     *       products:
     *         type: "array"
     *         items:
     *           $ref: "#/definitions/Product"
     *       totalPrice:
     *         type: "number"
     *         format: "float"
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
     *       quantity:
     *         type: "integer"
     */
    shoppingcartRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shoppingcart = await shoppingcartService.getShoppingCartById({
                id: parseInt(req.params.id),
            });
            res.status(200).json(shoppingcart);
        } catch (error) {
            next(error);
        }
    });

    shoppingcartRouter.get('/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shoppingcart = await shoppingcartService.getShoppingCartByUserId({
                userId: parseInt(req.params.userId),
            });
            res.status(200).json(shoppingcart);
        } catch (error) {
            next(error);
        }
    });

    shoppingcartRouter.get(
        '/username/:username',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const shoppingcart = await shoppingcartService.getShoppingCartByUsername({
                    username: req.params.username,
                });
                res.status(200).json(shoppingcart);
            } catch (error) {
                next(error);
            }
        }
    );

    shoppingcartRouter.post(
        '/:cartId/product/:productId',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const shoppingcart = await shoppingcartService.addProductToCart(
                    parseInt(req.params.cartId),
                    parseInt(req.params.productId)
                );
                res.status(200).json(shoppingcart);
            } catch (error) {
                next(error);
            }
        }
    );

    shoppingcartRouter.delete(
        '/:cartId/product/:productId',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const shoppingcart = await shoppingcartService.removeProductFromCart(
                    parseInt(req.params.cartId),
                    parseInt(req.params.productId)
                );
                res.status(200).json(shoppingcart);
            } catch (error) {
                next(error);
            }
        }
    );

    shoppingcartRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shoppingcart = await shoppingcartService.clearShoppingCart({
                id: parseInt(req.params.id),
            });
            res.status(200).json(shoppingcart);
        } catch (error) {
            next(error);
        }
    });

    shoppingcartRouter.put(
        '/:cartId/product/:productId',
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const shoppingcart = await shoppingcartService.changeProductQuantity(
                    parseInt(req.params.cartId),
                    parseInt(req.params.productId),
                    parseInt(req.body.quantity)
                );
                res.status(200).json(shoppingcart);
            } catch (error) {
                next(error);
            }
        }
    );

    export { shoppingcartRouter };
