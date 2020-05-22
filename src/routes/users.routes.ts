import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

/**
 * Handle POST Users requests
 *
 * @bodyParam name
 * @bodyParam email
 * @bodyParam password
 *
 * @since 1.0.0
 */
usersRouter.post('/', async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const createUserService = new CreateUserService();
		const user = await createUserService.execute({ name, email, password });

		return res.json(user);
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
});

export default usersRouter;
