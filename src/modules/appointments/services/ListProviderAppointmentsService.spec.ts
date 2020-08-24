import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		fakeCacheProvider = new FakeCacheProvider();
		listProviderAppointmentsService = new ListProviderAppointmentsService(
			fakeAppointmentsRepository,
			fakeCacheProvider,
		);

		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});
	});

	it('should be able to list the appointments of a provider in a given day', async () => {
		const user1 = await fakeUsersRepository.create({
			name: 'John Usero Uno',
			email: 'user1@email.com',
			password: '123456*',
		});

		const user2 = await fakeUsersRepository.create({
			name: 'John Usero Done',
			email: 'user2@email.com',
			password: '123456*',
		});

		const provider = await fakeUsersRepository.create({
			name: 'John Provido',
			email: 'provider@email.com',
			password: '123456*',
		});

		await fakeAppointmentsRepository.create({
			providerId: provider.id,
			userId: user1.id,
			date: new Date(2020, 4, 10, 13),
		});

		await fakeAppointmentsRepository.create({
			providerId: provider.id,
			userId: user2.id,
			date: new Date(2020, 4, 10, 16),
		});

		const appointments = await listProviderAppointmentsService.execute({
			providerId: provider.id,
			day: 10,
			month: 5,
			year: 2020,
		});

		expect(appointments.length).toBe(2);
	});
});
