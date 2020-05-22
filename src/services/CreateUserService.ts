import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

/**
 * Interface for the User objects passed to the execute method
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
interface RequestDTO {
	name: string;
	email: string;
	password: string;
}

/**
 * Class CreateUserService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class CreateUserService {
	public async execute({ name, email, password }: RequestDTO): Promise<User> {
		const usersRepository = getRepository(User);
		const checkUserExists = await usersRepository.findOne({
			where: { email },
		});

		if (checkUserExists) {
			throw new Error('Email address already taken.');
		}

		const passwordHash = await hash(password, 8);
		const user = usersRepository.create({
			name,
			email,
			password: passwordHash,
		});
		await usersRepository.save(user);

		delete user.password;
		return user;
	}
}
