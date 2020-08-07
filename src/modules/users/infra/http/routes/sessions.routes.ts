import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

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
	const authenticateUserService = container.resolve(AuthenticateUserService);

	const { user, token } = await authenticateUserService.execute({
		email,
		password,
	});

	return res.json({ user, token });
});

export default sessionsRouter;
