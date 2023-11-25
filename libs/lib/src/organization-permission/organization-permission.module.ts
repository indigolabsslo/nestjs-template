import { Module } from '@nestjs/common';
import { OrganizationPermissionService } from './organization-permission.service';

@Module({
  providers: [OrganizationPermissionService]
})
export class OrganizationPermissionModule {}
