import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoItem } from './demo-item.entity';
import { DemoItemProfile } from './demo-item.profile';
import { DemoItemService } from './demo-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([DemoItem])],
  providers: [DemoItemProfile, DemoItemService],
  exports: [DemoItemService],
})
export class DemoItemModule {}
