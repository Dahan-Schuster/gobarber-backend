/**
 * Interface IMailProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default interface IMailProvider {
	sendMail(to: string, body: string): Promise<void>;
}
