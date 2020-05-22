import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import User from './User';

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
	providerId: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'provider_id' })
	provider: User;

	@Column('timestamp with time zone')
	date: Date;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}

export default Appointment;
