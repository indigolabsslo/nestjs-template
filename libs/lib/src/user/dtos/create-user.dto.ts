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
  Email: string;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsString()
  Name: string | null;

  @ApiProperty({ nullable: true, enum: EUserRole, enumName: 'EUserRole' })
  @AutoMap(() => String)
  @IsOptional()
  @IsEnum(EUserRole)
  Role: EUserRole | null;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsUUID()
  AvatarId: string | null;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsString()
  SocialAvatarUrl: string | null;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsString()
  SupabaseId: string | null;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsString()
  GoogleId: string | null;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsString()
  AppleId: string | null;

  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsString()
  FacebookId: string | null;

  @ApiProperty({
    nullable: true,
    enum: EOnboardingStatus,
    enumName: 'EOnboardingStatus',
  })
  @AutoMap(() => String)
  @IsOptional()
  @IsEnum(EOnboardingStatus)
  OnboardingStatus: EOnboardingStatus | null;

  @ApiProperty({ nullable: true, enum: EUserStatus, enumName: 'EUserStatus' })
  @AutoMap(() => String)
  @IsOptional()
  @IsEnum(EUserStatus)
  Status: EUserStatus | null;
}
