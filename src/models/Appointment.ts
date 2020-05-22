import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

/**
 * Class Appointment
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 2.1.0 - Added createdAt and updatedAt properties
 */
@Entity('appointments')
class Appointment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	provider: string;

	@Column('timestamp with time zone')
	date: Date;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

export default Appointment;
