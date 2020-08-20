import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
	password: string;
	token: string;
}

/**
 * Class ResetPasswordService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
@injectable()
export default class ResetPasswordService {
	/**
	 * SendForgotPasswordEmailService's constructor
	 * Inicializes the IUsersRepository
	 *
	 * @param usersRepository
	 * @param userTokensRepository
	 * @param hashProvider
	 */
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('UserTokensRepository')
		private userTokensRepository: IUserTokensRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ token, password }: IRequest): Promise<void> {
		const userToken = await this.userTokensRepository.findByToken(token);

		if (!userToken) {
			throw new AppError('Invalid token');
		}

		const user = await this.usersRepository.findById(userToken.userId);

		if (!user) {
			throw new AppError('User does not exists');
		}

		const { createdAt } = userToken;

		if (differenceInHours(Date.now(), createdAt) > 2) {
			throw new AppError('Token expired');
		}

		user.password = await this.hashProvider.generateHash(password);

		await this.usersRepository.save(user);
	}
}