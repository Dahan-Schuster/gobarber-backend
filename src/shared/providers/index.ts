import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';

import { container } from 'tsyringe';

container.registerSingleton<IStorageProvider>(
	'StorageProvider',
	DiskStorageProvider,
);
