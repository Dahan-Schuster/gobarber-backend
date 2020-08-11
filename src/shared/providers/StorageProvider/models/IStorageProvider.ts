/**
 * Interface IStorageProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default interface IStorageProvider {
	saveFile(file: string): Promise<string>;

	deleteFile(file: string): Promise<void>;
}
