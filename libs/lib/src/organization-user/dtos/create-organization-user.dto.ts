import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { EOrganizationUserRole } from '../enums/organization-user-role.enum';

export class CreateOrganizationUserDto {
  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  Balance: number | null;

  @ApiProperty({
    nullable: true,
    enum: EOrganizationUserRole,
    enumName: 'EOrganizationUserRole',
  })
  @AutoMap(() => String)
  @IsOptional()
  @IsEnum(EOrganizationUserRole)
  Role: EOrganizationUserRole | null;

  @ApiProperty()
  @IsUUID()
  UserId: string;

  @ApiProperty()
  @IsUUID()
  OrganizationId: string;
}
