import {
	ObjectID,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	ObjectIdColumn,
} from 'typeorm';

/**
 * Class Notification
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
@Entity('notifications')
export default class Notification {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	content: string;

	@Column('uuid')
	recipientId: string;

	@Column({ default: false })
	read: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
