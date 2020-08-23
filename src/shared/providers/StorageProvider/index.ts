import { container } from 'tsyringe';

import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';

const providers = {
	disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
	'StorageProvider',
	providers.disk,
);
