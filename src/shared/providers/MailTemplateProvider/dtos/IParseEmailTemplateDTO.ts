interface ITemplateVariables {
	[key: string]: string | number;
}

/**
 * Interface IParseEmailTemplateDTO
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default interface IParseEmailTemplateDTO {
	file: string;
	variables: ITemplateVariables;
}
