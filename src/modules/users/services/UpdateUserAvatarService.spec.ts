import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';

describe('UpdateUserAvatar', () => {
	it('should be able to update user avatar', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();
		const updateUserAvatarService = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);

		let user = await fakeUsersRepository.create({
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			password: '123456*',
		});

		user = await updateUserAvatarService.execute({
			userId: user.id,
			avatarFilename: 'avatar.png',
		});

		expect(user).toHaveProperty('avatar');
		expect(user.avatar).toBe('avatar.png');
	});

	it('should not be able to proceed with an unauthenticated user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();
		const updateUserAvatarService = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);

		await expect(
			updateUserAvatarService.execute({
				userId: 'wrongId',
				avatarFilename: 'avatar.png',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should delete old avatar when a new one is uploaded', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();

		const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

		const updateUserAvatarService = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);

		let user = await fakeUsersRepository.create({
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			password: '123456*',
		});

		user = await updateUserAvatarService.execute({
			userId: user.id,
			avatarFilename: 'avatar.png',
		});

		user = await updateUserAvatarService.execute({
			userId: user.id,
			avatarFilename: 'newFile.png',
		});

		expect(deleteFile).toHaveBeenCalledWith('avatar.png');
		expect(user.avatar).toBe('newFile.png');
	});
});
