/**
 * Users Routes
 * @author Dahan Schuster <dan.plschuster@gmail.com>
 * @version 1.2.0 - Applies the use of the controllers
 */

import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();
const usersController = new UsersController();
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
 * @since 1.2.0 - Moves the route's logic to the controller
 */
usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	usersController.create,
);

/**
 * Handle PATCH Users' avatars requests
 * Upload a file to the system and save its path in the database
 *
 * @bodyParam avatar
 *
 * @since 1.0.0
 * @since 1.1.0 - Removes try/catch block because there's a Global Exception Handler
 * @since 1.2.0 - Moves the route's logic to the controller
 */
usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	usersController.changeAvatar,
);

export default usersRouter;
