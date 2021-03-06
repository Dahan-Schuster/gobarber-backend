import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeStorageProvider = new FakeStorageProvider();
		updateUserAvatarService = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider,
		);
	});

	it('should be able to update user avatar', async () => {
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
		await expect(
			updateUserAvatarService.execute({
				userId: 'wrongId',
				avatarFilename: 'avatar.png',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should delete old avatar when a new one is uploaded', async () => {
		const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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
