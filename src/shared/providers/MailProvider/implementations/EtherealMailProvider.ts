import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '@shared/providers/MailProvider/dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';

/**
 * Class FakeMailProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
@injectable()
export default class EtherealMailProvider implements IMailProvider {
	private client: Transporter;

	constructor(
		@inject('MailTemplateProvider')
		private mailTemplateProvider: IMailTemplateProvider,
	) {
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

	public async sendMail({
		to,
		from,
		subject,
		templateData,
	}: ISendMailDTO): Promise<void> {
		const info = await this.client.sendMail({
			from: {
				name: from?.name || 'Equipe Gobarber',
				address: from?.email || 'equipe@gobarber.com.br',
			},
			to: {
				name: to.name,
				address: to.email,
			},
			subject,
			html: await this.mailTemplateProvider.parse(templateData),
		});

		console.log('Message sent');
		console.log('ID:', info.messageId);
		console.log('Message:', info.message);
		console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
	}
}
