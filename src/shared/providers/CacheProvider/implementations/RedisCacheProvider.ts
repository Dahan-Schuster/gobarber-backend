import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';

/**
 * Class RedisCacheProvider
 *
 * @author Dahan Schuster <dan.plschuster@gmail.com> <github:dahan-schuster>
 * @version 1.0.0
 */
export default class RedisCacheProvider implements ICacheProvider {
	private client: RedisClient;

	constructor() {
		this.client = new Redis(cacheConfig.config.redis);
	}

	public async save(key: string, value: any): Promise<void> {
		await this.client.set(key, JSON.stringify(value));
	}

	public async get<T>(key: string): Promise<T | null> {
		const data = await this.client.get(key);

		if (!data) return null;

		return JSON.parse(data) as T;
	}

	public async invalidate(key: string): Promise<void> {
		await this.client.del(key);
	}

	public async invalidatePrefix(prefix: string): Promise<void> {
		const keys = await this.client.keys(`${prefix}:*`);

		const pipeline = this.client.pipeline();

		keys.forEach(key => pipeline.del(key));

		await pipeline.exec();
	}
}
