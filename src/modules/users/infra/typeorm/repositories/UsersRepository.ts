import { EntityRepository, getRepository, In, Not, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

/**
 * Class UsersRepository
 * For operations with the users repository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.1.0 - findAllProviders
 */
@EntityRepository(User)
class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>;

	/**
	 * UsersRepository's constructor
	 *
	 * @since 1.0.0 - Initial version
	 */
	constructor() {
		this.ormRepository = getRepository(User);
	}

	/**
	 * Finds all users, except the ones with ID included id exceptUserIds
	 *
	 * @param exceptUserIds
	 * @return Promise<User[]>
	 *
	 * @since 1.1.0 - Initial version
	 */
	public async findAllProviders(exceptUserIds?: string[]): Promise<User[]> {
		let options;
		if (exceptUserIds) {
			options = {
				where: {
					id: Not(In(exceptUserIds)),
				},
			};
		}
		return this.ormRepository.find(options);
	}

	/**
	 * Finds an user by its UUID
	 *
	 * @param id
	 * @return Promise<User | null>
	 *
	 * @since 1.0.0 - Initial version
	 */
	public async findById(id: string): Promise<User | undefined> {
		const findUser = await this.ormRepository.findOne(id);
		return findUser || undefined;
	}

	/**
	 * Finds an user by its email
	 *
	 * @param email
	 * @return Promise<User | null>
	 *
	 * @since 1.0.0 - Initial version
	 */
	public async findByEmail(email: string): Promise<User | undefined> {
		const findUser = await this.ormRepository.findOne({
			where: { email },
		});

		return findUser || undefined;
	}

	/**
	 * Creates and saves an user in the database
	 *
	 * @param data: ICreateUserDTO
	 * @return Promise<User | null>
	 *
	 * @since 1.0.0 - Initial version
	 */
	public async create({
		name,
		email,
		password,
	}: ICreateUserDTO): Promise<User> {
		const user = this.ormRepository.create({ name, email, password });
		await this.ormRepository.save(user);
		return user;
	}

	/**
	 * Saves an user's data in the database
	 *
	 * @param user
	 * @return Promise<User | null>
	 *
	 * @since 1.0.0 - Initial version
	 */
	save(user: User): Promise<User> {
		return this.ormRepository.save(user);
	}
}

export default UsersRepository;
