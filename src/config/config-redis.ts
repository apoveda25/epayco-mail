import { ConfigService } from '@nestjs/config';

export const configRedis = (configService: ConfigService) => ({
  redis: {
    port: configService.get('db.redis.port'),
    host: configService.get('db.redis.host'),
    password: configService.get('db.redis.password'),
  },
});
