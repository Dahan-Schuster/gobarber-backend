import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

/**
 * Class DiskStorageProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class DiskStorageProvider implements IStorageProvider {
	public async saveFile(file: string): Promise<string> {
		await fs.promises.rename(
			path.resolve(uploadConfig.tmpFolder, file),
			path.resolve(uploadConfig.uploadsFolder, file),
		);

		return file;
	}

	public async deleteFile(file: string): Promise<void> {
		const filePath = path.resolve(uploadConfig.uploadsFolder, file);

		try {
			await fs.promises.stat(filePath);
		} catch {
			return;
		}

		await fs.promises.unlink(filePath);
	}
}
