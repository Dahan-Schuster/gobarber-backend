import { uuid } from 'uuidv4';

/**
 * Class Appointment
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
class Appointment {
	id: string;

	provider: string;

	date: Date;

	/**
	 * @param provider
	 * @param date
	 *
	 * @since 1.0.0
	 */
	constructor(provider: string, date: Date) {
		this.id = uuid();
		this.provider = provider;
		this.date = date;
	}
}

export default Appointment;
