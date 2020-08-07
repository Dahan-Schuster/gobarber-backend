/**
 * Session Routes
 * Create user's sessions (login)
 * @author Dahan Schuster <dan.plschuster@gmail.com>
 * @version 1.2.0 - Applies the use of the controllers
 */

import { Router } from 'express';
import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const sessionsController = new SessionsController();
const sessionsRouter = Router();

/**
 * Handle POST Sessions requests
 * Authenticate a user to login the system
 *
 * @bodyParam email
 * @bodyParam password
 *
 * @since 1.0.0
 * @since 1.1.0 - Removes try/catch block because there's a Global Exception Handler
 * @since 1.2.0 - Moves the route's logic to the controller
 */
sessionsRouter.post('/', sessionsController.login);

export default sessionsRouter;
