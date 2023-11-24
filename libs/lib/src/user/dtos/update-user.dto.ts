import { PartialType } from '@nestjs/swagger';
import { ReplaceUserDto } from './replace-user.dto';

export class UpdateUserDto extends PartialType(ReplaceUserDto) {}
