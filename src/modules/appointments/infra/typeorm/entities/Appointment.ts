import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

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

	@Column({ name: 'provider_id' })
	providerId: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'provider_id' })
	provider: User;

	@Column({ name: 'user_id' })
	userId: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@Column('timestamp with time zone')
	date: Date;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}

export default Appointment;
