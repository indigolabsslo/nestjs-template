import { Module } from '@nestjs/common';
import { OrganizationRoleController } from './organization-role.controller';

@Module({
  controllers: [OrganizationRoleController],
})
export class OrganizationRoleModule {}
