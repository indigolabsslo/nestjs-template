import { CrudConfigService } from '@indigolabs/crud';
import { crudGlobalConfig } from '@lib/shared/config/crud-global.config';
CrudConfigService.load(crudGlobalConfig);

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiModule } from '../src/api.module';
import { SupabaseService } from '@lib/supabase/supabase.service';
import getOrganizationListDtoSchema from '@lib/organization/schemas/get-organization-list-dto.schema';
import { GetOrganizationDto } from '@lib/organization/dtos/get-organization.dto';
import { CreateOrganizationDto } from '@lib/organization/dtos/create-organization.dto';
import { GetMediaDto } from '@lib/media/dtos/get-media.dto';
import { join } from 'path';
import { readFileSync } from 'fs';
import getMediaDtoSchema from '@lib/media/schemas/get-media-dto.schema';
import getOrganizationDtoSchema from '@lib/organization/schemas/get-organization-dto.schema';
import { UpdateOrganizationDto } from '@lib/organization/dtos/update-organization.dto';

describe('Admin User (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let supabaseService: SupabaseService;
  let organizationImage: GetMediaDto;
  let organization: GetOrganizationDto;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    supabaseService = moduleFixture.get<SupabaseService>(SupabaseService);
    accessToken = await supabaseService.signin({
      email: 'admin@indigo.si',
      password: 'adminpassword',
    });
    console.log(accessToken);
    await app.init();
  });

  it('/organization (GET)', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/organization')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    const { error } = getOrganizationListDtoSchema.validate(body);
    expect(error).toBeUndefined();
  });

  it('/media (POST)', async () => {
    const imageName = 'organization-1-image.png';
    const filePath = join(__dirname, imageName);
    const file = readFileSync(filePath);

    const { body } = await request(app.getHttpServer())
      .post('/media/upload')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', file, imageName)
      .expect(201);

    organizationImage = body;
    const { error } = getMediaDtoSchema.validate(body);
    expect(error).toBeUndefined();
  });

  it('/organization (POST)', async () => {
    const createOrganizationDto: CreateOrganizationDto = {
      name: 'Organization Test',
      imageId: organizationImage.id,
    };
    const { body } = await request(app.getHttpServer())
      .post('/organization/' + organization.id)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(createOrganizationDto)
      .expect(201);

    organization = body;
    const { error } = getOrganizationDtoSchema.validate(body);
    expect(error).toBeUndefined();
  });

  // it(`/organization/${organization.Id} (PATCH)`, async () => {
  //   const updateOrganizationDto: UpdateOrganizationDto = {
  //     Name: 'Organization Test New',
  //   };
  //   const { body } = await request(app.getHttpServer())
  //     .post(`/organization/${organization.Id}`)
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .send(updateOrganizationDto)
  //     .expect(201);
  //   const { error } = getOrganizationDtoSchema.validate(body);
  //   expect(error).toBeUndefined();
  // });

  // it(`/organization/${organization.Id} (GET)`, async () => {
  //   const { body } = await request(app.getHttpServer())
  //     .get(`/organization/${organization.Id}`)
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .expect(200);
  //   const { error } = getOrganizationDtoSchema.validate(body);
  //   expect(error).toBeUndefined();
  // });
});
