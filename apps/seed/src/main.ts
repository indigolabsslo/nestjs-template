import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.create(SeedModule);
  await app.get(SeedService).seed();
  await app.close();
  process.exit(0);
}
bootstrap();
