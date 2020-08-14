import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';

interface Message {
	to: string;
	body: string;
}

/**
 * Class FakeMailProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class FakeMailProvider implements IMailProvider {
	private messages: Message[] = [];

	public async sendMail(to: string, body: string): Promise<void> {
		this.messages.push({
			to,
			body,
		});
	}
}
