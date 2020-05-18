import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Class Appointment
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 2.0.0 - Conversion to a TypeOrm Entity
 */
@Entity('appointments')
class Appointment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	provider: string;

	@Column('timestamp with time zone')
	date: Date;
}

export default Appointment;
