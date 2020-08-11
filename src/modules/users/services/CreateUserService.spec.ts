import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
	it('should be able to create a new user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const user = await createUserService.execute({
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			password: '123456*',
		});

		expect(user).toHaveProperty('id');
	});

	it('should not be able to create two users with the same email', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const email = 'bolinha@gmail.com';
		await createUserService.execute({
			name: 'João Bolinha',
			email,
			password: '123456*',
		});

		await expect(
			createUserService.execute({
				name: 'João "Clone" Bolinha',
				email,
				password: '*123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
