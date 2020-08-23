import { getMongoRepository, MongoRepository } from 'typeorm';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

/**
 * Class NotificationsRepository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class NotificationsRepository
	implements INotificationsRepository {
	private ormRepository: MongoRepository<Notification>;

	/**
	 * NotificationsRepository's constructor
	 *
	 * @since 1.0.0 - Initial version
	 */
	constructor() {
		this.ormRepository = getMongoRepository(Notification, 'mongo');
	}

	public async create({
		content,
		recipientId,
	}: ICreateNotificationDTO): Promise<Notification> {
		const notification = this.ormRepository.create({
			content,
			recipientId,
		});

		await this.ormRepository.save(notification);

		return notification;
	}
}
