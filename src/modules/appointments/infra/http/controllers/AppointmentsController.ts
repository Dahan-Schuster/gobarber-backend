import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

/**
 * Class AppointmentController
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class AppointmentsController {
	/**
	 * Calls the CreateAppointmentService to create and save a new Appointment
	 *
	 * @param request
	 * @param response
	 * @return Promise<Response>
	 *
	 * @since 1.0.0
	 */
	public async create(
		request: Request,
		response: Response,
	): Promise<Response> {
		const { id: userId } = request.user;
		const { providerId, date } = request.body;

		const createAppointmentService = container.resolve(
			CreateAppointmentService,
		);
		const appointment = await createAppointmentService.execute({
			providerId,
			userId,
			date,
		});

		return response.json(appointment);
	}
}
