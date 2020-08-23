import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

interface IRequestDTO {
	userId: string;
	avatarFilename: string;
}

/**
 * Class UpdateUserAvatarService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 2.0.0 - Applies Liskov Substitution Principle, using and interface for the repository instead of the
 * repository implementation itself
 */
@injectable()
export default class UpdateUserAvatarService {
	/**
	 * CreateUserService's constructor
	 * Inicializes the IUsersRepository
	 *
	 * @param usersRepository
	 * @param storageProvider
	 */
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('StorageProvider')
		private storageProvider: IStorageProvider,
	) {}

	public async execute({
		userId,
		avatarFilename,
	}: IRequestDTO): Promise<User> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppError(
				'Only authenticated users can update avatar',
				401,
			);
		}

		if (user.avatar) {
			await this.storageProvider.deleteFile(user.avatar);
		}

		user.avatar = await this.storageProvider.saveFile(avatarFilename);

		await this.usersRepository.save(user);

		return classToClass(user);
	}
}
