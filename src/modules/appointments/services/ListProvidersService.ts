import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
	exceptUserIds?: string[];
}

/**
 * Class ListProvidersService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
@injectable()
export default class ListProvidersService {
	/**
	 * ListProvidersService's constructor
	 * Inicializes the IUsersRepository
	 *
	 * @param usersRepository
	 */
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	public async execute({ exceptUserIds }: IRequestDTO): Promise<User[]> {
		return this.usersRepository.findAllProviders(exceptUserIds);
	}
}
