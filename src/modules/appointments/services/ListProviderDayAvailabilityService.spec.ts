import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
			fakeAppointmentsRepository,
		);
	});

	it('should be able to list the day availability from provider', async () => {
		await fakeAppointmentsRepository.create({
			providerId: 'providerId',
			userId: 'userId',
			date: new Date(2020, 4, 20, 15),
		});

		await fakeAppointmentsRepository.create({
			providerId: 'providerId',
			userId: 'userId',
			date: new Date(2020, 4, 20, 16),
		});

		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 20, 11).getTime();
		});

		const availability = await listProviderDayAvailabilityService.execute({
			providerId: 'providerId',
			year: 2020,
			month: 5,
			day: 20,
		});

		expect(availability).toEqual(
			expect.arrayContaining([
				{ hour: 8, available: false },
				{ hour: 9, available: false },
				{ hour: 10, available: false },
				{ hour: 11, available: false },
				{ hour: 12, available: true },
				{ hour: 13, available: true },
				{ hour: 14, available: true },
				{ hour: 15, available: false },
				{ hour: 16, available: false },
				{ hour: 17, available: true },
			]),
		);
	});
});
