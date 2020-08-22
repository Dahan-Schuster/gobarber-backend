import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/providers/MailProvider/dtos/ISendMailDTO';

/**
 * Class FakeMailProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class FakeMailProvider implements IMailProvider {
	private messages: ISendMailDTO[] = [];

	public async sendMail(message: ISendMailDTO): Promise<void> {
		this.messages.push(message);
	}
}
