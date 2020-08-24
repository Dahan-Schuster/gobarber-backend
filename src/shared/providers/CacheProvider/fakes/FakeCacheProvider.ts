import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

interface ICacheData {
	[key: string]: any;
}

/**
 * Class FakeCacheProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class FakeCacheProvider implements ICacheProvider {
	private cache: ICacheData = {};

	public async save(key: string, value: any): Promise<void> {
		this.cache[key] = value;
	}

	public async get<T>(key: string): Promise<T | null> {
		const data = this.cache[key];

		if (!data) return null;

		return data as T;
	}

	public async invalidatePrefix(prefix: string): Promise<void> {
		const keys = Object.keys(this.cache).filter(key =>
			key.startsWith(`${prefix}:`),
		);

		keys.forEach(key => {
			delete this.cache[key];
		});
	}

	public async invalidate(key: string): Promise<void> {
		delete this.cache[key];
	}
}
