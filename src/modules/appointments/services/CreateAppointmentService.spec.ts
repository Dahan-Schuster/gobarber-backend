import { uuid } from 'uuidv4';

import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		createAppointmentService = new CreateAppointmentService(
			fakeAppointmentsRepository,
		);

		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime();
		});
	});

	it('should be able to create a new appointment', async () => {
		const providerId = uuid();
		const userId = uuid();
		const appointment = await createAppointmentService.execute({
			date: new Date(2020, 4, 10, 13),
			providerId,
			userId,
		});

		expect(appointment).toHaveProperty('id');
		expect(appointment.providerId).toBe(providerId);
	});

	it('should not be able to create two appointments on the same time', async () => {
		const date = new Date(2020, 4, 20, 13);

		await createAppointmentService.execute({
			date,
			providerId: uuid(),
			userId: uuid(),
		});

		await expect(
			createAppointmentService.execute({
				date,
				providerId: uuid(),
				userId: uuid(),
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment at a past date', async () => {
		await expect(
			createAppointmentService.execute({
				date: new Date(2020, 4, 10, 11),
				providerId: uuid(),
				userId: uuid(),
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('user should not be able to create an appointment with itself', async () => {
		const id = uuid();
		await expect(
			createAppointmentService.execute({
				date: new Date(2020, 4, 10, 13),
				providerId: id,
				userId: id,
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment before work journey start hour', async () => {
		await expect(
			createAppointmentService.execute({
				date: new Date(2020, 4, 11, 7),
				providerId: uuid(),
				userId: uuid(),
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment after work journey end hour', async () => {
		await expect(
			createAppointmentService.execute({
				date: new Date(2020, 4, 12, 18),
				providerId: uuid(),
				userId: uuid(),
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
