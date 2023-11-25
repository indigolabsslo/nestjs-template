import { Module } from '@nestjs/common';
import { OrganizationRoleService } from './organization-role.service';

@Module({
  providers: [OrganizationRoleService]
})
export class OrganizationRoleModule {}
