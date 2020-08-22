import IParseEmailTemplateDTO from '@shared/providers/MailTemplateProvider/dtos/IParseEmailTemplateDTO';

/**
 * Interface IMailTemplateProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default interface IMailTemplateProvider {
	parse(data: IParseEmailTemplateDTO): Promise<string>;
}
