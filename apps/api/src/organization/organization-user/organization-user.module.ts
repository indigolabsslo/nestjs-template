import { Module } from '@nestjs/common';
import { OrganizationUserController } from './organization-user.controller';

@Module({
  controllers: [OrganizationUserController],
})
export class OrganizationUserModule {}
