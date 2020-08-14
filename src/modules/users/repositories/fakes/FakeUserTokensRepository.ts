import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';

/**
 * Class FakeUserTokensRepository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class FakeUserTokensRepository implements IUserTokensRepository {
	private tokens: UserToken[] = [];

	public async generate(userId: string): Promise<UserToken> {
		const userToken = new UserToken();
		Object.assign(userToken, {
			id: uuid(),
			token: uuid(),
			userId,
			createdAt: new Date(),
		});

		this.tokens.push(userToken);
		return userToken;
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		return this.tokens.find(existingToken => existingToken.token === token);
	}
}
