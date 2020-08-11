import { uuid } from 'uuidv4';

import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
	it('should be able to create a new appointment', async () => {
		const fakeAppointmentsRepository = new FakeAppointmentsRepository();
		const createAppointmentService = new CreateAppointmentService(
			fakeAppointmentsRepository,
		);

		const providerId = uuid();
		const appointment = await createAppointmentService.execute({
			date: new Date(),
			providerId,
		});

		expect(appointment).toHaveProperty('id');
		expect(appointment.providerId).toBe(providerId);
	});

	it('should not be able to create two appointments on the same time', async () => {
		const fakeAppointmentsRepository = new FakeAppointmentsRepository();
		const createAppointmentService = new CreateAppointmentService(
			fakeAppointmentsRepository,
		);

		const date = new Date();

		await createAppointmentService.execute({
			date,
			providerId: uuid(),
		});

		await expect(
			createAppointmentService.execute({
				date,
				providerId: uuid(),
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
