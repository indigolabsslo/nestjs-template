import { Module } from '@nestjs/common';
import { OrganizationDemoItemController } from './organization-demo-item.controller';

@Module({
  controllers: [OrganizationDemoItemController],
})
export class OrganizationDemoItemModule {}
