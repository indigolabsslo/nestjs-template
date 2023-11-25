import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { EOrganizationRoleRole } from '../enums/organization-role-role.enum';

export class CreateOrganizationRoleDto {
  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  Balance: number | null;

  @ApiProperty({
    nullable: true,
    enum: EOrganizationRoleRole,
    enumName: 'EOrganizationRoleRole',
  })
  @AutoMap(() => String)
  @IsOptional()
  @IsEnum(EOrganizationRoleRole)
  Role: EOrganizationRoleRole | null;

  @ApiProperty()
  @IsUUID()
  UserId: string;

  @ApiProperty()
  @IsUUID()
  OrganizationId: string;
}
