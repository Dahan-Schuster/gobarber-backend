/**
 * Class AppError
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class AppError {
	public readonly message: string;

	public readonly statusCode: number;

	constructor(message: string, statusCode = 400) {
		this.message = message;
		this.statusCode = statusCode;
	}
}
