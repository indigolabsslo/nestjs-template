import { PartialType } from '@nestjs/swagger';
import { ReplaceMediaDto } from './replace-media.dto';

export class UpdateMediaDto extends PartialType(ReplaceMediaDto) {}
