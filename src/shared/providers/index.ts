import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from '@shared/providers/MailProvider/implementations/EtherealMailProvider';

import { container } from 'tsyringe';

container.registerSingleton<IStorageProvider>(
	'StorageProvider',
	DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
	'MailProvider',
	new EtherealMailProvider(),
);
