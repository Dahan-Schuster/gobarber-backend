import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

interface IRequestDTO {
	exceptUserId?: string;
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
	 * @param cacheProvider
	 */
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,
	) {}

	public async execute({ exceptUserId }: IRequestDTO): Promise<User[]> {
		let users = await this.cacheProvider.get<User[]>(
			`providers-list:${exceptUserId}`,
		);

		if (!users) {
			users = await this.usersRepository.findAllProviders(exceptUserId);
			await this.cacheProvider.save(
				`providers-list:${exceptUserId}`,
				users,
			);
		}

		return users;
	}
}
