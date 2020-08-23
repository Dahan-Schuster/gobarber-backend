import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

/**
 * Interface for the data object used to auth a user
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
interface IRequestDTO {
	email: string;
	password: string;
}

/**
 * Interface for the data returned by the service
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
interface IResponse {
	user: User;
	token: string;
}

/**
 * Class AuthenticateUserService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 2.0.0 - Applies Liskov Substitution Principle, using and interface for the repository instead of the
 * repository implementation itself
 */
@injectable()
export default class AuthenticateUserService {
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

	public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Incorrect email/password combination', 401);
		}

		const passwordMatched = await this.hashProvider.compareHash(
			password,
			user.password,
		);

		if (!passwordMatched) {
			throw new AppError('Incorrect email/password combination', 401);
		}

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, String(secret), {
			subject: user.id,
			expiresIn,
		});

		delete user.password;
		return { user, token };
	}
}
