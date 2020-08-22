import ISendMailDTO from '@shared/providers/MailProvider/dtos/ISendMailDTO';

/**
 * Interface IMailProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default interface IMailProvider {
	sendMail(data: ISendMailDTO): Promise<void>;
}
