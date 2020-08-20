/**
 * Session Routes
 * Create user's sessions (login)
 * @author Dahan Schuster <dan.plschuster@gmail.com>
 * @version 1.0.0
 */

import { Router } from 'express';
import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const passwordRouter = Router();

/**
 * Handle POST Forgot Password requests
 * Sends an email with a User Token to the user to reset its password
 *
 * @bodyParam email
 * @bodyParam password
 *
 * @since 1.0.0
 */
passwordRouter.post('/forgot', forgotPasswordController.create);

/**
 * Handle POST Reset Password requests
 * Receives a User Token and a new password and reset the password of the token's associated user
 *
 * @bodyParam email
 * @bodyParam password
 *
 * @since 1.0.0
 */
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
