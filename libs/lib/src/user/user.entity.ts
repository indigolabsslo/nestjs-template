import { AutoMap } from '@automapper/classes';
import { Media } from '@lib/media/media.entity';
import { OrganizationUser } from '@lib/organization-user/organization-user.entity';
import { BaseEntity } from '@lib/shared/entities/base-entity.entity';
import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { EOnboardingStatus } from './enums/onboarding-status.enum';
import { EUserRole } from './enums/user-role.enum';
import { EUserStatus } from './enums/user-status.enum';

@Entity('user')
export class User extends BaseEntity {
  @AutoMap()
  @Column({ unique: true, nullable: true })
  Email: string | null;

  @AutoMap()
  @Column({ nullable: true })
  Name: string | null;

  @AutoMap(() => String)
  @Column({
    type: 'enum',
    enum: EUserRole,
    default: EUserRole.USER,
    enumName: 'EUserRole',
  })
  Role: EUserRole;

  @AutoMap(() => Media)
  @OneToOne(() => Media, { nullable: true })
  Avatar: Media | null;

  @AutoMap()
  @Column({ nullable: true })
  SocialAvatarUrl: string | null;

  @AutoMap()
  @Column({ nullable: true })
  SupabaseId: string | null;

  @AutoMap()
  @Column({ nullable: true })
  GoogleId: string | null;

  @AutoMap()
  @Column({ nullable: true })
  AppleId: string | null;

  @AutoMap()
  @Column({ nullable: true })
  FacebookId: string | null;

  @AutoMap(() => String)
  @Column({
    type: 'enum',
    enum: EOnboardingStatus,
    default: EOnboardingStatus.NOT_STARTED,
    enumName: 'EOnboardingStatus',
  })
  OnboardingStatus: EOnboardingStatus;

  @AutoMap(() => String)
  @Column({
    type: 'enum',
    enum: EUserStatus,
    default: EUserStatus.ACTIVE,
    enumName: 'EUserStatus',
  })
  Status: EUserStatus;

  @AutoMap(() => [OrganizationUser])
  @OneToMany(
    () => OrganizationUser,
    (organizationUser) => organizationUser.User,
  )
  OrganizationUsers: OrganizationUser[];
}
