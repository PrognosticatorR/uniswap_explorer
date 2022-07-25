import express from 'express';
import { expressjwt as jwt } from 'express-jwt';

import { config } from '../configs.js';
import { UserController } from '../controllers/userController.js';

const controller = new UserController();
export const userRouter = express.Router();

/** GET /api/users */
userRouter.route('/').get(controller.find);

/** GET /api/users/:userId */
/** Authenticated route */
userRouter.route('/:userId').get(jwt(config), controller.get);

/** POST /api/users */
userRouter.route('/').post(controller.create);

/** PATCH /api/users/:userId */
/** Authenticated route */
userRouter.route('/:userId').patch(jwt(config), controller.patch);
