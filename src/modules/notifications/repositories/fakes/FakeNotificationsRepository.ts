import { ObjectID } from 'mongodb';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

/**
 * Class FakeNotificationsRepository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class FakeNotificationsRepository
	implements INotificationsRepository {
	private notifications: Notification[] = [];

	public async create({
		content,
		recipientId,
	}: ICreateNotificationDTO): Promise<Notification> {
		const notification = new Notification();

		Object.assign(notification, {
			id: new ObjectID(),
			content,
			recipientId,
		});

		this.notifications.push(notification);
		return notification;
	}
}
