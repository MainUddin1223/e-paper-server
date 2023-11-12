import express from 'express';
import { authController } from './auth.controller';
const router = express.Router();

router.route('/create-admin').post(authController.createAdmin);

export default { authRouter: router };
