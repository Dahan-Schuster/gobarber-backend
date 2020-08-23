import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

/**
 * Class User
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.1.0 - Adds avatar field
 */
@Entity('users')
export default class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	@Exclude()
	password: string;

	@Column()
	@Exclude()
	avatar: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Expose({ name: 'avatarUrl' })
	getAvatarUrl(): string | null {
		return this.avatar
			? `${process.env.BASE_URL_API}/files/${this.avatar}`
			: null;
	}
}
