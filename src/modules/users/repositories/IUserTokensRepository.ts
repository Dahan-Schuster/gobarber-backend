import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

/**
 * Interface IUserTokensRepository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default interface IUserTokensRepository {
	generate(userId: string): Promise<UserToken>;

	findByToken(token: string): Promise<UserToken | undefined>;
}
