import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeCacheProvider = new FakeCacheProvider();
		listProvidersService = new ListProvidersService(
			fakeUsersRepository,
			fakeCacheProvider,
		);
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
			exceptUserId: user.id,
		});

		expect(users.length).toBe(1);
	});
});
