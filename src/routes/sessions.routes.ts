import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

/**
 * Handle POST Sessions requests
 * Authenticate a user to login the system
 *
 * @bodyParam email
 * @bodyParam password
 *
 * @since 1.0.0
 */
sessionsRouter.post('/', async (req, res) => {
	try {
		const { email, password } = req.body;
		const authenticateUserService = new AuthenticateUserService();

		const { user, token } = await authenticateUserService.execute({
			email,
			password,
		});

		return res.json({ user, token });
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
});

export default sessionsRouter;
