import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AdminUserAttributes,
  createClient,
  SignInWithPasswordCredentials,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabaseClient: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabaseClient = createClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_KEY'),
    );
  }

  async checkBuckets(buckets: string[]) {
    const existingBuckets = (
      await this.supabaseClient.storage.listBuckets()
    ).data.map((b) => b.name);
    buckets.forEach(async (b) => {
      if (!existingBuckets.includes(b)) {
        await this.supabaseClient.storage.createBucket(b, { public: true });
      }
    });
  }

  async uploadFile(
    bucket: string,
    file: Express.Multer.File,
    filename?: string,
  ): Promise<any> {
    const { data, error } = await this.supabaseClient.storage
      .from(bucket)
      .upload(filename ?? file.originalname, file.buffer, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }

    return data;
  }

  async createSignedUrl(
    bucket: string,
    path: string,
    expiresIn: number,
  ): Promise<string> {
    const { data, error } = await this.supabaseClient.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) {
      throw new Error(`Error creating signed URL: ${error.message}`);
    }

    return data.signedUrl;
  }

  async createPublicUrl(bucket: string, path: string): Promise<string> {
    const { data } = this.supabaseClient.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  async createUser(credentials: AdminUserAttributes): Promise<User> {
    const { data, error } =
      await this.supabaseClient.auth.admin.createUser(credentials);

    if (error) {
      console.log(`Error creating user: ${error.message}`);
      //throw new Error(`Error creating user: ${error.message}`);
    }

    return data.user;
  }

  async signin(credentials: SignInWithPasswordCredentials): Promise<string> {
    const { data, error } =
      await this.supabaseClient.auth.signInWithPassword(credentials);

    if (error) {
      throw new Error(`Error sign in user: ${error.message}`);
    }

    return data.session.access_token;
  }
}
