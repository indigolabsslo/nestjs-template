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
  email: string | null;

  @AutoMap()
  @Column({ nullable: true })
  name: string | null;

  @AutoMap(() => String)
  @Column({
    type: 'enum',
    enum: EUserRole,
    default: EUserRole.USER,
    enumName: 'EUserRole',
  })
  role: EUserRole;

  @AutoMap(() => Media)
  @OneToOne(() => Media, { nullable: true })
  avatar: Media | null;

  @AutoMap()
  @Column({ nullable: true })
  socialAvatarUrl: string | null;

  @AutoMap()
  @Column({ nullable: true })
  supabaseId: string | null;

  @AutoMap()
  @Column({ nullable: true })
  googleId: string | null;

  @AutoMap()
  @Column({ nullable: true })
  appleId: string | null;

  @AutoMap()
  @Column({ nullable: true })
  facebookId: string | null;

  @AutoMap(() => String)
  @Column({
    type: 'enum',
    enum: EOnboardingStatus,
    default: EOnboardingStatus.NOT_STARTED,
    enumName: 'EOnboardingStatus',
  })
  onboardingStatus: EOnboardingStatus;

  @AutoMap(() => String)
  @Column({
    type: 'enum',
    enum: EUserStatus,
    default: EUserStatus.ACTIVE,
    enumName: 'EUserStatus',
  })
  status: EUserStatus;

  @AutoMap(() => [OrganizationUser])
  @OneToMany(
    () => OrganizationUser,
    (organizationUser) => organizationUser.user,
  )
  organizationUsers: OrganizationUser[];
}
