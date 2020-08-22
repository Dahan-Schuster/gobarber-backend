import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfileService: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		updateUserProfileService = new UpdateUserProfileService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});

	it('should be able to update user profile', async () => {
		const user = await fakeUsersRepository.create({
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			password: '123456*',
		});

		const updatedUser = await updateUserProfileService.execute({
			userId: user.id,
			name: 'John Doe',
			email: 'johndoe@email.com',
		});

		expect(updatedUser.name).toBe('John Doe');
		expect(updatedUser.email).toBe('johndoe@email.com');
	});

	it("should not be able to change user's email to an already used one", async () => {
		const user = await fakeUsersRepository.create({
			name: 'João Bolinha',
			email: 'bolinha@email.com',
			password: '123456*',
		});

		await fakeUsersRepository.create({
			name: 'Maria do Carmo',
			email: 'maria@email.com',
			password: '123456*',
		});

		await expect(
			updateUserProfileService.execute({
				userId: user.id,
				name: 'John Doe',
				email: 'maria@email.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to update user password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			password: '123',
		});

		const updatedUser = await updateUserProfileService.execute({
			userId: user.id,
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			oldPassword: '123',
			password: '123456*',
		});

		expect(updatedUser.password).toBe('123456*');
	});

	it('should not be able to update user password without the old one', async () => {
		const user = await fakeUsersRepository.create({
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			password: '123',
		});

		await expect(
			updateUserProfileService.execute({
				userId: user.id,
				name: 'João Bolinha',
				email: 'bolinha@gmail.com',
				password: '123456*',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to update user password with incorrect old password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			password: '123',
		});

		await expect(
			updateUserProfileService.execute({
				userId: user.id,
				name: 'João Bolinha',
				email: 'bolinha@gmail.com',
				oldPassword: '321',
				password: '123456*',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to update the password of a non-existing user', async () => {
		await expect(
			updateUserProfileService.execute({
				userId: 'wrong-id',
				name: 'João Bolinha',
				email: 'bolinha@gmail.com',
				oldPassword: '321',
				password: '123456*',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
