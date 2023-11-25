import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { EOnboardingStatus } from '../enums/onboarding-status.enum';
import { EUserRole } from '../enums/user-role.enum';
import { EUserStatus } from '../enums/user-status.enum';

export class CreateUserDto {
  @ApiProperty()
  @AutoMap()
  @IsEmail()
  email: string;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsString()
  name: string | null;

  @ApiProperty({ nullable: true, enum: EUserRole, enumName: 'EUserRole' })
  @AutoMap(() => String)
  @IsOptional()
  @IsEnum(EUserRole)
  role: EUserRole | null;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsUUID()
  avatarId: string | null;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsString()
  socialAvatarUrl: string | null;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsString()
  supabaseId: string | null;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsString()
  googleId: string | null;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsString()
  appleId: string | null;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsString()
  facebookId: string | null;

  @ApiProperty({
    nullable: true,
    enum: EOnboardingStatus,
    enumName: 'EOnboardingStatus',
  })
  @AutoMap(() => String)
  @IsOptional()
  @IsEnum(EOnboardingStatus)
  onboardingStatus: EOnboardingStatus | null;

  @ApiProperty({ nullable: true, enum: EUserStatus, enumName: 'EUserStatus' })
  @AutoMap(() => String)
  @IsOptional()
  @IsEnum(EUserStatus)
  status: EUserStatus | null;
}
