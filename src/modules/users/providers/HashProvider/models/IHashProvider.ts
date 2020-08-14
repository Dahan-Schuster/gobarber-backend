/**
 * Interface IHashProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default interface IHashProvider {
	generateHash(payload: string): Promise<string>;

	compareHash(payload: string, hashed: string): Promise<boolean>;
}
