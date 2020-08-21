import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeMailProvider = new FakeMailProvider();
		fakeUserTokensRepository = new FakeUserTokensRepository();
		sendForgotPasswordEmail = new SendForgotPasswordEmailService(
			fakeUsersRepository,
			fakeMailProvider,
			fakeUserTokensRepository,
		);
	});

	it('should be able to send a password recovery email', async () => {
		const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

		await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: '123456*',
		});

		await sendForgotPasswordEmail.execute({
			email: 'johndoe@email.com',
		});

		expect(sendMail).toHaveBeenCalled();
	});

	it('should not be able to send a password recovery email to a non-existing user', async () => {
		await expect(
			sendForgotPasswordEmail.execute({
				email: 'bolinha@gmail.com',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should generate a new user token for password recovering', async () => {
		const generate = jest.spyOn(fakeUserTokensRepository, 'generate');

		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: '123456*',
		});

		await sendForgotPasswordEmail.execute({
			email: 'johndoe@email.com',
		});

		expect(generate).toHaveBeenCalledWith(user.id);
	});
});
