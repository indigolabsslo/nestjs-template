import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private configService: ConfigService,
  ) {}

  async get<T>(key: string): Promise<T | undefined> {
    return this.cache.get(key);
  }

  async set<T>(key: string, value?: T, ttl?: number): Promise<void> {
    if (value) {
      return this.cache.set(
        key,
        value,
        ttl ?? this.configService.getOrThrow<number>('REDIS_TTL'),
      );
    }
  }

  async delete(key: string): Promise<void> {
    return this.cache.del(key);
  }

  reset(): Promise<void> {
    return this.cache.reset();
  }

  async getCachedOrInvoke<T>(
    key: string,
    method: () => Promise<T>,
    ttl?: number,
  ) {
    const cached = await this.get<T>(key);
    if (cached) {
      return cached;
    } else {
      const res: T = await method();
      await this.set<T>(key, res, ttl);
      return res;
    }
  }
}
