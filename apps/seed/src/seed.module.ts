import { LibModule } from '@lib';
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';

@Module({
  imports: [LibModule],
  controllers: [],
  providers: [SeedService],
})
export class SeedModule {}
