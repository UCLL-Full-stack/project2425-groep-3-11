import express, { Request, Response, NextFunction } from 'express';
import { UserInput } from '../types';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management and authentication
 * paths:
 *   /signup:
 *     post:
 *       summary: Register a new user
 *       description: Allows a user to sign up by providing their username, email, password, and role.
 *       operationId: signup
 *       tags:
 *         - Users
 *       requestBody:
 *         description: User data required to create a new user.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 password:
 *                   type: string
 *                   example: mysecurepassword
 *                 role:
 *                   type: string
 *                   enum:
 *                     - user
 *                     - admin
 *                   example: user
 *               required:
 *                 - username
 *                 - email
 *                 - password
 *                 - role
 *       responses:
 *         '200':
 *           description: User created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '400':
 *           description: Invalid input data
 *         '500':
 *           description: Internal server error
 *   /login:
 *     post:
 *       summary: User login
 *       description: Authenticates a user with their username and password.
 *       operationId: login
 *       tags:
 *         - Users
 *       requestBody:
 *         description: User credentials for login.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 password:
 *                   type: string
 *                   example: mysecurepassword
 *               required:
 *                 - username
 *                 - password
 *       responses:
 *         '200':
 *           description: Authentication successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Authentication successful
 *                   token:
 *                     type: string
 *                     example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJ1c2VybmFtZSI6Implbm5pZCIsImlhdCI6MTYzNzg5NDAwOX0.S9HhGfHewvq7_pd_o-73hQ_R0FvD1yP5duY_aDzPyH4'
 *         '400':
 *           description: Invalid username or password
 *         '500':
 *           description: Internal server error
 *   /{id}:
 *     get:
 *       summary: Get user by ID
 *       description: Fetches a user by their unique ID.
 *       operationId: getUserById
 *       tags:
 *         - Users
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID of the user to retrieve
 *           schema:
 *             type: integer
 *             example: 1
 *       responses:
 *         '200':
 *           description: A user object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Internal server error
 *   /username/{username}:
 *     get:
 *       summary: Get user by username
 *       description: Fetches a user by their username.
 *       operationId: getUserByUsername
 *       tags:
 *         - Users
 *       parameters:
 *         - name: username
 *           in: path
 *           required: true
 *           description: Username of the user to retrieve
 *           schema:
 *             type: string
 *             example: johndoe
 *       responses:
 *         '200':
 *           description: A user object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Internal server error
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         role:
 *           type: string
 *           enum:
 *             - user
 *             - admin
 *           example: user
 */

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
        res.status(200).json({ message: 'Authentication successful', token: response.token,username:response.username,role:response.role });
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

userRouter.post('/getUsers', async (req: Request, res: Response, next: NextFunction) => {
    const userInput = <UserInput>req.body;
    const users= await userService.getUsers(userInput)
    res.status(200).json(users);
}
);

export { userRouter };
