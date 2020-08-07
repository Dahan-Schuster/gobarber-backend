import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';

const usersRouter = Router();
const upload = multer(uploadConfig);

/**
 * Handle POST Users requests
 *
 * @bodyParam name
 * @bodyParam email
 * @bodyParam password
 *
 * @since 1.0.0
 * @since 1.1.0 - Removes try/catch block because there's a Global Exception Handler
 */
usersRouter.post('/', async (req, res) => {
	const { name, email, password } = req.body;
	const createUserService = container.resolve(CreateUserService);
	const user = await createUserService.execute({ name, email, password });

	return res.json(user);
});

/**
 * Handle PATCH Users' avatars requests
 * Upload a file to the system and save its path in the database
 *
 * @bodyParam avatar
 *
 * @since 1.0.0
 * @since 1.1.0 - Removes try/catch block because there's a Global Exception Handler
 */
usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (req, res) => {
		const updateUserAvatarService = container.resolve(
			UpdateUserAvatarService,
		);

		const user = await updateUserAvatarService.execute({
			userId: req.user.id,
			avatarFilename: req.file.filename,
		});

		return res.json(user);
	},
);

export default usersRouter;
