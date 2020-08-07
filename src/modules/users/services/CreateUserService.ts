import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/infra/repositories/IUsersRepository';

/**
 * Class CreateUserService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 2.0.0 - Applies Liskov Substitution Principle, using and interface for the repository instead of the
 * repository implementation itself
 */
export default class CreateUserService {
	/**
	 * CreateUserService's constructor
	 * Inicializes the IUsersRepository
	 *
	 * @param usersRepository
	 */
	constructor(private usersRepository: IUsersRepository) {}

	public async execute({
		name,
		email,
		password,
	}: ICreateUserDTO): Promise<User> {
		const checkUserExists = await this.usersRepository.findByEmail(email);

		if (checkUserExists) {
			throw new AppError('Email address already taken.');
		}

		const passwordHash = await hash(password, 8);
		const user = await this.usersRepository.create({
			name,
			email,
			password: passwordHash,
		});

		delete user.password;
		return user;
	}
}
