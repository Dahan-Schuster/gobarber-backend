import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

/**
 * Interface IUsersRepository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default interface IUsersRepository {
	findById(id: string): Promise<User | undefined>;

	findByEmail(email: string): Promise<User | undefined>;

	findAllProviders(exceptUserIds?: string[]): Promise<User[]>;

	create(data: ICreateUserDTO): Promise<User>;

	save(user: User): Promise<User>;
}
