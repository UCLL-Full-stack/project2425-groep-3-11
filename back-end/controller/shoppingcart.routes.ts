import express, { NextFunction, Request, Response } from 'express';
import shoppingcartService from '../service/shoppingcart.service';

const shoppingcartRouter = express.Router();

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
export { shoppingcartRouter };
