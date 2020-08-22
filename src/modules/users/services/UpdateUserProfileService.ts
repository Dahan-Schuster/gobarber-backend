import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
	userId: string;
	name: string;
	email: string;
	oldPassword?: string;
	password?: string;
}

/**
 * Class UpdateUserAvatarService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 2.0.0 - Applies Liskov Substitution Principle, using and interface for the repository instead of the
 * repository implementation itself
 */
@injectable()
export default class UpdateUserProfileService {
	/**
	 * CreateUserService's constructor
	 * Inicializes the IUsersRepository
	 *
	 * @param usersRepository
	 * @param hashProvider
	 */
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		userId,
		name,
		email,
		oldPassword,
		password,
	}: IRequestDTO): Promise<User> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppError('User not found');
		}

		const userWithUpdatedEmail = await this.usersRepository.findByEmail(
			email,
		);

		if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
			throw new AppError('Email already in use');
		}

		user.name = name;
		user.email = email;

		if (password) {
			if (!oldPassword) {
				throw new AppError(
					'The old password is required to change password',
				);
			}

			const checkOldPassword = await this.hashProvider.compareHash(
				oldPassword,
				user.password,
			);
			if (!checkOldPassword) {
				throw new AppError('Incorrect password');
			}

			user.password = await this.hashProvider.generateHash(password);
		}

		return this.usersRepository.save(user);
	}
}
