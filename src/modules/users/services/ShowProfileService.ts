import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
	userId: string;
}

/**
 * Class ShowProfileService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
@injectable()
export default class ShowProfileService {
	/**
	 * CreateUserService's constructor
	 * Inicializes the IUsersRepository
	 *
	 * @param usersRepository
	 */
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ userId }: IRequestDTO): Promise<User> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppError('User not found');
		}

		return user;
	}
}
