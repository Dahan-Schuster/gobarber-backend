import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

/**
 * Class FakeUsersRepository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class FakeUsersRepository implements IUsersRepository {
	private users: User[] = [];

	create(data: ICreateUserDTO): Promise<User> {
		const user = new User();

		Object.assign(user, { ...data, id: uuid() });
		this.users.push(user);

		return Promise.resolve({ ...user });
	}

	findByEmail(email: string): Promise<User | undefined> {
		const foundUser = this.users.find(u => u.email === email);
		return Promise.resolve(foundUser ? { ...foundUser } : undefined);
	}

	findById(id: string): Promise<User | undefined> {
		const foundUser = this.users.find(u => u.id === id);
		return Promise.resolve(foundUser ? { ...foundUser } : undefined);
	}

	save(user: User): Promise<User> {
		const foundUserIndex = this.users.findIndex(u => u.id === user.id);

		if (foundUserIndex > -1) {
			this.users[foundUserIndex] = user;
		}

		return Promise.resolve({ ...user });
	}
}
