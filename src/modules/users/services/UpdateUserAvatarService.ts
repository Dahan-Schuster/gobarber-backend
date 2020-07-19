import { getRepository } from 'typeorm';
import * as path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';

interface RequestDTO {
	userId: string;
	avatarFilename: string;
}

/**
 * Class UpdateUserAvatarService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class UpdateUserAvatarService {
	public async execute({
		userId,
		avatarFilename,
	}: RequestDTO): Promise<User> {
		const usersRepository = getRepository(User);

		const user = await usersRepository.findOne(userId);

		if (!user) {
			throw new AppError(
				'Only authenticated users can update avatar',
				401,
			);
		}

		if (user.avatar) {
			// delete old avatar
			const userAvatarFilePath = path.join(
				uploadConfig.directory,
				user.avatar,
			);
			const userAvatarFileExists = await fs.promises.stat(
				userAvatarFilePath,
			);

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		user.avatar = avatarFilename;

		await usersRepository.save(user);

		delete user.password;
		return user;
	}
}
