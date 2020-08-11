import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

/**
 * Class FakeStorageProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class FakeStorageProvider implements IStorageProvider {
	private storage: string[] = [];

	saveFile(file: string): Promise<string> {
		this.storage.push(file);
		return Promise.resolve(file);
	}

	deleteFile(file: string): Promise<void> {
		const findIndex = this.storage.findIndex(
			storageFile => storageFile === file,
		);

		this.storage.splice(findIndex, 1);
		return Promise.resolve();
	}
}
