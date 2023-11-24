import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { OrganizationProfile } from './organization.profile';
import { OrganizationService } from './organization.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  providers: [OrganizationProfile, OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
