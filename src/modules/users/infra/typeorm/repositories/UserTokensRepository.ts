import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

/**
 * Class UserTokensRepository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class UserTokensRepository implements IUserTokensRepository {
	private ormRepository: Repository<UserToken>;

	/**
	 * UserTokensRepository's constructor
	 *
	 * @since 1.0.0 - Initial version
	 */
	constructor() {
		this.ormRepository = getRepository(UserToken);
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		const findUserToken = await this.ormRepository.findOne({
			where: { token },
		});

		return findUserToken || undefined;
	}

	public async generate(userId: string): Promise<UserToken> {
		const userToken = this.ormRepository.create({
			userId,
		});

		await this.ormRepository.save(userToken);

		return userToken;
	}
}
