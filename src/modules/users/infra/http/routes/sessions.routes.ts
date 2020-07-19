import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

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
 */
sessionsRouter.post('/', async (req, res) => {
	const { email, password } = req.body;
	const authenticateUserService = new AuthenticateUserService();

	const { user, token } = await authenticateUserService.execute({
		email,
		password,
	});

	return res.json({ user, token });
});

export default sessionsRouter;
