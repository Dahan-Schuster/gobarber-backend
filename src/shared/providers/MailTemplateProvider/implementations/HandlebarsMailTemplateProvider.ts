import handlebars from 'handlebars';

import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IParseEmailTemplateDTO from '@shared/providers/MailTemplateProvider/dtos/IParseEmailTemplateDTO';
import * as fs from 'fs';

/**
 * Class HandlebarsMailTemplateProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class HandlebarsMailTemplateProvider
	implements IMailTemplateProvider {
	public async parse({
		file,
		variables,
	}: IParseEmailTemplateDTO): Promise<string> {
		const templateFileContent = await fs.promises.readFile(file, {
			encoding: 'utf-8',
		});
		const parseTemplate = handlebars.compile(templateFileContent);

		return parseTemplate(variables);
	}
}
