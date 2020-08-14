import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
	email: string;
}

/**
 * Class SendForgotPasswordEmailService
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
@injectable()
export default class SendForgotPasswordEmailService {
	/**
	 * SendForgotPasswordEmailService's constructor
	 * Inicializes the IUsersRepository
	 *
	 * @param usersRepository
	 * @param mailProvider
	 * @param userTokensRepository
	 */
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('MailProvider')
		private mailProvider: IMailProvider,

		@inject('UserTokensRepository')
		private userTokensRepository: IUserTokensRepository,
	) {}

	public async execute({ email }: IRequest): Promise<void> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError(
				"Can't recover the password of a non-existing user",
			);
		}

		const userToken = await this.userTokensRepository.generate(user.id);

		await this.mailProvider.sendMail(
			email,
			`Token de recuperação de senha: ${userToken.token}`,
		);
	}
}
