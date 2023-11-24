import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { MediaProfile } from './media.profile';
import { MediaService } from './media.service';
import { MediaSubscriber } from './media.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  providers: [MediaService, MediaProfile, MediaSubscriber],
  exports: [MediaService],
})
export class MediaModule {}
