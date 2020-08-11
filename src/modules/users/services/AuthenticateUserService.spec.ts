import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
	it('should be able to authenticate', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const authenticateUserService = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
		const createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const user = await createUserService.execute({
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			password: '123456*',
		});

		const response = await authenticateUserService.execute({
			email: 'bolinha@gmail.com',
			password: '123456*',
		});

		expect(response).toHaveProperty('token');
		expect(response.user).toEqual(user);
	});

	it('should not be able to authenticate with wrong email', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const authenticateUserService = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
		const createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		await createUserService.execute({
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			password: '123456*',
		});

		await expect(
			authenticateUserService.execute({
				email: 'wrong@gmail.com',
				password: '123456*',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate with wrong password', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const authenticateUserService = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
		const createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		await createUserService.execute({
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			password: '123456*',
		});

		await expect(
			authenticateUserService.execute({
				email: 'bolinha@gmail.com',
				password: 'wrong',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
