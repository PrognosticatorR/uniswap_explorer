import express from 'express';

import { AuthController } from '../controllers/authController.js';

const controller = new AuthController();
export const authRouter = express.Router();

/** POST /api/auth */
authRouter.route('/').post(controller.create);
