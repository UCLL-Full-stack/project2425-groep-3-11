import express, { NextFunction, Request, Response } from 'express';
import productService from '../service/product.service';


const productRouter = express.Router();


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