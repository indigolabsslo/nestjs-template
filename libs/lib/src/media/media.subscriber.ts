import { SupabaseService } from '@lib/supabase/supabase.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { Media } from './media.entity';

@Injectable()
@EventSubscriber()
export class MediaSubscriber implements EntitySubscriberInterface<Media> {
  private signedUrlExpiration: number;
  private bucket: string;

  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    private readonly supabaseService: SupabaseService,
  ) {
    this.dataSource.subscribers.push(this);
    this.signedUrlExpiration = +this.configService.getOrThrow<string>(
      'SUPABASE_SIGNED_URL_EXPIRATION',
    );
    this.bucket = this.configService.getOrThrow('SUPABASE_BUCKET');
  }

  listenTo() {
    return Media;
  }

  async afterLoad(media: Media) {
    if (media.key) {
      media.url =
        //TODO: Change this
        media.public || true
          ? await this.supabaseService.createPublicUrl(this.bucket, media.key)
          : await this.supabaseService.createSignedUrl(
              this.bucket,
              media.key,
              this.signedUrlExpiration,
            );
    }
  }
}
