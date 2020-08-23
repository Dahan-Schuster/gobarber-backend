import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

/**
 * Interface INotificationsRepository
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default interface INotificationsRepository {
	create(data: ICreateNotificationDTO): Promise<Notification>;
}
