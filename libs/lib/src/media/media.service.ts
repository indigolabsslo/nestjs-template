import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { SupabaseService } from '@lib/supabase/supabase.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMediaDto } from './dtos/create-media.dto';
import { Media } from './media.entity';
import { getKey, mimeToType } from './media.utils';

@Injectable()
export class MediaService {
  private Bucket = this.configService.get<string>('SUPABASE_BUCKET');

  constructor(
    private configService: ConfigService,
    @InjectRepository(Media)
    private repository: Repository<Media>,
    @InjectMapper()
    private mapper: Mapper,
    private supabaseService: SupabaseService,
  ) {
    this.supabaseService.checkBuckets([this.Bucket]);
  }

  async create(file: Express.Multer.File) {
    const Name = file.filename ?? file.originalname;
    const Key = getKey(Name);
    const Type = mimeToType(file.mimetype);
    const Public = false;

    await this.supabaseService.uploadFile(this.Bucket, file, Key);

    const entity = this.mapper.map(
      { Key, Type, Name, Public },
      CreateMediaDto,
      Media,
    );

    const res = await this.repository.save(entity);
    return this.findOne(res.Id);
  }

  async findOne(Id: string): Promise<Media | null> {
    return this.repository.findOne({
      where: { Id },
    });
  }
}
