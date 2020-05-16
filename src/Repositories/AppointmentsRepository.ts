import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

/**
 * DTO for creating new appointments
 *
 * @version 1.0.0
 */
interface CreateAppointmentDTO {
	provider: string;
	date: Date;
}

/**
 * Class AppointmentsRepository
 * For operations with the appointments repository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
class AppointmentsRepository {
	private appointments: Appointment[];

	/**
	 * @since 1.0.0
	 */
	constructor() {
		this.appointments = [];
	}

	/**
	 * Returns all the appointments
	 *
	 * @return Appointment[]
	 *
	 * @since 1.0.0
	 */
	public all(): Appointment[] {
		return this.appointments;
	}

	/**
	 * Finds an appointment by its book date
	 * Returns null if no appointment is find
	 *
	 * @param date
	 * @return Appointment | Null
	 *
	 * @since 1.0.0
	 */
	public findByDate(date: Date): Appointment | null {
		const findAppointment = this.appointments.find(appointment =>
			isEqual(date, appointment.date),
		);

		return findAppointment || null;
	}

	/**
	 * Creates a new appointment, save it in the repository
	 * and return it and an Appointment object
	 *
	 * @param provider
	 * @param date
	 * @return Appointment
	 *
	 * @since 1.0.0
	 */
	public create({ provider, date }: CreateAppointmentDTO): Appointment {
		const appointment = new Appointment({ provider, date });
		this.appointments.push(appointment);

		return appointment;
	}
}

export default AppointmentsRepository;
