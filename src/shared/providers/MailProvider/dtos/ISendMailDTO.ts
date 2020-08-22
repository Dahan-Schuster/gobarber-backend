import IParseEmailTemplateDTO from '@shared/providers/MailTemplateProvider/dtos/IParseEmailTemplateDTO';

interface IMailContact {
	name: string;
	email: string;
}

/**
 * Interface ISendMailDTO
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default interface ISendMailDTO {
	to: IMailContact;
	from?: IMailContact;
	subject: string;
	templateData: IParseEmailTemplateDTO;
}
