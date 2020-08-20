import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';

/**
 * Class FakeMailProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class EtherealMailProvider implements IMailProvider {
	private client: Transporter;

	constructor() {
		nodemailer.createTestAccount().then(account => {
			this.client = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
					user: account.user,
					pass: account.pass,
				},
			});
		});
	}

	public async sendMail(to: string, body: string): Promise<void> {
		const info = await this.client.sendMail({
			from: 'Equipe Gobarber <equipe@gobarber.com.br>',
			to,
			subject: 'Recuperação de senha',
			text: body,
		});

		console.log('Message sent');
		console.log('ID:', info.messageId);
		console.log('Message:', info.message);
		console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
	}
}
