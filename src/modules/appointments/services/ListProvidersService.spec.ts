import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		listProvidersService = new ListProvidersService(fakeUsersRepository);
	});

	it('should be able to list all providers', async () => {
		await fakeUsersRepository.create({
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			password: '123456*',
		});

		await fakeUsersRepository.create({
			name: 'Maria do Carmo',
			email: 'maria@gmail.com',
			password: '123456*',
		});

		const users = await listProvidersService.execute({});

		expect(users.length).toBe(2);
	});

	it('should be able to list all providers with userId exception', async () => {
		await fakeUsersRepository.create({
			name: 'João Bolinha',
			email: 'bolinha@gmail.com',
			password: '123456*',
		});

		const user = await fakeUsersRepository.create({
			name: 'Maria do Carmo',
			email: 'maria@gmail.com',
			password: '123456*',
		});

		const users = await listProvidersService.execute({
			exceptUserIds: [user.id],
		});

		expect(users.length).toBe(1);
	});
});
