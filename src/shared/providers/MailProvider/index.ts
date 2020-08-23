import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/providers/MailProvider/implementations/EtherealMailProvider';

const providers = {
	ethereal: container.resolve(EtherealMailProvider),
	ses: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
	'MailProvider',
	providers[mailConfig.driver],
);
