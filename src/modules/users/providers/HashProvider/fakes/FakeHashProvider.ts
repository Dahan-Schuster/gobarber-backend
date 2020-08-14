import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

/**
 * Class BCryptHashProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class FakeHashProvider implements IHashProvider {
	public generateHash = async (payload: string): Promise<string> => payload;

	public compareHash = async (
		payload: string,
		hashed: string,
	): Promise<boolean> => payload === hashed;
}
