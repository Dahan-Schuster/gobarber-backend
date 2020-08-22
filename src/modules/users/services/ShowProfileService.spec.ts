import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowUserProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		showProfileService = new ShowProfileService(fakeUsersRepository);
	});

	it("should be able to show the user's profile", async () => {
		const user = await fakeUsersRepository.create({
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			password: '123456*',
		});

		const shownUser = await showProfileService.execute({ userId: user.id });

		expect(shownUser.name).toBe(user.name);
		expect(shownUser.email).toBe(user.email);
	});

	it('should not be able to show the profile of a non-existing user', async () => {
		await expect(
			showProfileService.execute({ userId: 'wrong-id' }),
		).rejects.toBeInstanceOf(AppError);
	});
});
