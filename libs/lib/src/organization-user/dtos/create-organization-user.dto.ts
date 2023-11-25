import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class CreateOrganizationUserDto {
  @ApiProperty({ nullable: true })
  @AutoMap()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  Balance: number | null;

  @ApiProperty()
  @IsUUID()
  OrganizationRoleId: string;

  @ApiProperty()
  @IsUUID()
  UserId: string;

  @ApiProperty()
  @IsUUID()
  OrganizationId: string;
}
