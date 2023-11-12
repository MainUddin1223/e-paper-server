import express from 'express';
import { authController } from './auth.controller';
import { verifyAuth } from '../../utils/auth_jwt/verifyAuth';
const router = express.Router();

router.route('/create-admin').post(authController.createAdmin);
router.route('/login').post(authController.login);
router
  .route('/change-password')
  .patch(verifyAuth, authController.changePassword);

export default { authRouter: router };
