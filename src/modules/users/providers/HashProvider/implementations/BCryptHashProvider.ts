import { hash, compare } from 'bcryptjs';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

/**
 * Class BCryptHashProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class BCryptHashProvider implements IHashProvider {
	public async generateHash(payload: string): Promise<string> {
		return hash(payload, 8);
	}

	public async comparteHash(
		payload: string,
		hashed: string,
	): Promise<boolean> {
		return compare(payload, hashed);
	}
}
