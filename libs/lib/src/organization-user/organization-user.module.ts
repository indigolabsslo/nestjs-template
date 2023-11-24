import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationUser } from './organization-user.entity';
import { OrganizationUserProfile } from './organization-user.profile';
import { OrganizationUserService } from './organization-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationUser])],
  providers: [OrganizationUserService, OrganizationUserProfile],
  exports: [OrganizationUserService],
})
export class OrganizationUserModule {}
