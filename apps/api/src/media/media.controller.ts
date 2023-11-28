import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Feature } from '@indigolabs/crud';
import { GetMediaDto } from '@lib/media/dtos/get-media.dto';
import { Media } from '@lib/media/media.entity';
import { MediaService } from '@lib/media/media.service';
import { Public } from '@lib/shared/decorators/public.decorator';
import { EApiTags } from '@lib/shared/enums/api-tags.enum';
import { EControllers } from '@lib/shared/enums/controllers.enum';
import { ECrudFeatures } from '@lib/shared/enums/crud-features.enum';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags(EApiTags.Media)
@Feature(ECrudFeatures.Media)
@ApiBearerAuth()
@Controller(`${EControllers.Media}`)
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    @InjectMapper()
    private mapper: Mapper,
  ) {}

  @ApiOkResponse({
    type: GetMediaDto,
  })
  @Public()
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<GetMediaDto> {
    const res = await this.mediaService.create(file);
    return this.mapper.map(res, Media, GetMediaDto);
  }
}
