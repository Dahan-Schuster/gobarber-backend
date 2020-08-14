import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let resetPasswordService: ResetPasswordService;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassword', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeUserTokensRepository = new FakeUserTokensRepository();
		fakeHashProvider = new FakeHashProvider();
		resetPasswordService = new ResetPasswordService(
			fakeUsersRepository,
			fakeUserTokensRepository,
			fakeHashProvider,
		);
	});

	it('should be able to reset the password', async () => {
		const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: '123',
		});

		const { token } = await fakeUserTokensRepository.generate(user.id);

		await resetPasswordService.execute({
			password: '123456*',
			token,
		});

		const updatedUser = await fakeUsersRepository.findById(user.id);
		expect(updatedUser?.password).toBe('123456*');
		expect(generateHash).toHaveBeenCalledWith('123456*');
	});

	it('should not be able to reset the password with a invalid token', async () => {
		await expect(
			resetPasswordService.execute({
				password: '123456*',
				token: 'invalid-token',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to reset the password with an expired token', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: '123',
		});

		const { token } = await fakeUserTokensRepository.generate(user.id);

		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			const customDate = new Date();
			return customDate.setHours(customDate.getHours() + 3);
		});

		await expect(
			resetPasswordService.execute({
				password: '123456*',
				token,
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to reset the password of a non-existing user', async () => {
		const { token } = await fakeUserTokensRepository.generate(
			'non-existing-user',
		);

		await expect(
			resetPasswordService.execute({
				password: '123456*',
				token,
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
