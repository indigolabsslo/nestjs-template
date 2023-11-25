import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationRole } from './organization-role.entity';
import { OrganizationRoleProfile } from './organization-role.profile';
import { OrganizationRoleService } from './organization-role.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationRole])],
  providers: [OrganizationRoleService, OrganizationRoleProfile],
  exports: [OrganizationRoleService],
})
export class OrganizationRoleModule {}
