import { PartialType } from '@nestjs/swagger';
import { ReplaceDemoItemDto } from './replace-demo-item.dto';

export class UpdateDemoItemDto extends PartialType(ReplaceDemoItemDto) {}
