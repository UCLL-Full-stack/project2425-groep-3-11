import express, { Request, Response, NextFunction } from 'express';
import { UserInput } from '../types';
import userService from '../service/user.service';

const userRouter = express.Router();

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication succesful', ...response });
    } catch (error) {
        next(error);
    }
});

userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserById(parseInt(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/username/:username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserByUsername({ username: req.params.username });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export { userRouter };
