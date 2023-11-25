import { Module } from '@nestjs/common';
import { OrganizationPermissionService } from './organization-permission.service';

@Module({
  imports: [],
  providers: [OrganizationPermissionService],
  exports: [OrganizationPermissionService],
})
export class OrganizationPermissionModule {}
