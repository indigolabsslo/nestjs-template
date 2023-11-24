/* eslint-disable @typescript-eslint/no-unused-vars */
import { CrudRequest } from '@indigolabs/crud';
import { DemoItem } from '@lib/demo-item/demo-item.entity';
import { DemoItemService } from '@lib/demo-item/demo-item.service';
import { CreateDemoItemDto } from '@lib/demo-item/dtos/create-demo-item.dto';
import { MediaService } from '@lib/media/media.service';
import { CreateOrganizationUserDto } from '@lib/organization-user/dtos/create-organization-user.dto';
import { EOrganizationUserRole } from '@lib/organization-user/enums/organization-user-role.enum';
import { OrganizationUser } from '@lib/organization-user/organization-user.entity';
import { OrganizationUserService } from '@lib/organization-user/organization-user.service';
import { CreateOrganizationDto } from '@lib/organization/dtos/create-organization.dto';
import { Organization } from '@lib/organization/organization.entity';
import { OrganizationService } from '@lib/organization/organization.service';
import { SupabaseService } from '@lib/supabase/supabase.service';
import { CreateUserDto } from '@lib/user/dtos/create-user.dto';
import { EOnboardingStatus } from '@lib/user/enums/onboarding-status.enum';
import { EUserRole } from '@lib/user/enums/user-role.enum';
import { EUserStatus } from '@lib/user/enums/user-status.enum';
import { User } from '@lib/user/user.entity';
import { UserService } from '@lib/user/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class SeedService {
  defaultReq: CrudRequest;
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private organizationService: OrganizationService,
    private organizationUserService: OrganizationUserService,
    private mediaService: MediaService,
    private demoItemService: DemoItemService,
    private supabaseService: SupabaseService,
  ) {
    this.defaultReq = {
      options: { routes: { createOneBase: { returnShallow: true } } },
      parsed: {
        fields: null,
        paramsFilter: [],
        authPersist: [],
        classTransformOptions: null,
        search: null,
        filter: [],
        or: [],
        join: [],
        sort: [],
        limit: 1,
        offset: 0,
        page: 1,
        cache: 0,
        includeDeleted: 0,
      },
    };
  }

  async seed(): Promise<void> {
    const files_path = this.configService.get<string>('SEED_FILES_PATH');

    /***** SUPABASE USER *****/
    const [
      _supabaseAdmin,
      _supabaseUser1,
      _supabaseUser2,
      _supabaseUser3,
      _supabaseUser4,
    ] = await Promise.all([
      this.supabaseService.createUser({
        email: 'admin@indigo.si',
        password: 'adminpassword',
        email_confirm: true,
      }),
      this.supabaseService.createUser({
        email: 'user1@indigo.si',
        password: 'user1password',
        email_confirm: true,
      }),
      this.supabaseService.createUser({
        email: 'user2@indigo.si',
        password: 'user2password',
        email_confirm: true,
      }),
      this.supabaseService.createUser({
        email: 'user3@indigo.si',
        password: 'user3password',
        email_confirm: true,
      }),
      this.supabaseService.createUser({
        email: 'user4@indigo.si',
        password: 'user4password',
        email_confirm: true,
      }),
    ]);
    /***** SUPABASE USER END *****/

    /***** USER *****/
    const [admin, user1, user2, user3, user4] = await Promise.all([
      this.userService.createOne(
        this.defaultReq,
        {
          Email: 'admin@indigo.si',
          Name: 'Admin',
          Role: EUserRole.ADMIN,
          AppleId: null,
          AvatarId: null,
          FacebookId: null,
          SupabaseId: null,
          GoogleId: null,
          SocialAvatarUrl: null,
          OnboardingStatus: EOnboardingStatus.COMPLETE,
          Status: EUserStatus.ACTIVE,
        },
        CreateUserDto,
        User,
      ),
      this.userService.createOne(
        this.defaultReq,
        {
          Email: 'user1@indigo.si',
          Name: 'User 1',
          Role: EUserRole.USER,
          AppleId: null,
          AvatarId: null,
          FacebookId: null,
          SupabaseId: null,
          GoogleId: null,
          SocialAvatarUrl: null,
          OnboardingStatus: EOnboardingStatus.COMPLETE,
          Status: EUserStatus.ACTIVE,
        },
        CreateUserDto,
        User,
      ),
      this.userService.createOne(
        this.defaultReq,
        {
          Email: 'user2@indigo.si',
          Name: 'User 2',
          Role: EUserRole.USER,
          AppleId: null,
          AvatarId: null,
          FacebookId: null,
          SupabaseId: null,
          GoogleId: null,
          SocialAvatarUrl: null,
          OnboardingStatus: EOnboardingStatus.COMPLETE,
          Status: EUserStatus.ACTIVE,
        },
        CreateUserDto,
        User,
      ),
      this.userService.createOne(
        this.defaultReq,
        {
          Email: 'user3@indigo.si',
          Name: 'User 3',
          Role: EUserRole.USER,
          AppleId: null,
          AvatarId: null,
          FacebookId: null,
          SupabaseId: null,
          GoogleId: null,
          SocialAvatarUrl: null,
          OnboardingStatus: EOnboardingStatus.COMPLETE,
          Status: EUserStatus.ACTIVE,
        },
        CreateUserDto,
        User,
      ),
      this.userService.createOne(
        this.defaultReq,
        {
          Email: 'user4@indigo.si',
          Name: 'User 4',
          Role: EUserRole.USER,
          AppleId: null,
          AvatarId: null,
          FacebookId: null,
          SupabaseId: null,
          GoogleId: null,
          SocialAvatarUrl: null,
          OnboardingStatus: EOnboardingStatus.COMPLETE,
          Status: EUserStatus.ACTIVE,
        },
        CreateUserDto,
        User,
      ),
    ]);
    /***** USER END *****/

    /***** ORGANIZATION *****/
    const [organization1Image, organization2Image] = await Promise.all(
      ['organization-1-image.png', 'organization-2-image.png'].map(
        async (i) => {
          const buffer = readFileSync(join(files_path, i));
          return this.mediaService.create({
            filename: i,
            mimetype: 'image/png',
            buffer: buffer,
          } as Express.Multer.File);
        },
      ),
    );

    const [organization1, organization2] = await Promise.all([
      this.organizationService.createOne(
        this.defaultReq,
        {
          Name: 'Organization 1',
          ImageId: organization1Image.Id,
        },
        CreateOrganizationDto,
        Organization,
      ),
      this.organizationService.createOne(
        this.defaultReq,
        {
          Name: 'Organization 2',
          ImageId: organization2Image.Id,
        },
        CreateOrganizationDto,
        Organization,
      ),
    ]);
    /***** ORGANIZATION END *****/

    /***** ORGANIZATION USER *****/
    const [
      organizationUserOrganization1User1,
      organizationUserOrganization1User2,
      organizationUserOrganization1User3,
      organizationUserOrganization1User4,
      organizationUserOrganization2User1,
      organizationUserOrganization2User2,
      organizationUserOrganization2User3,
      organizationUserOrganization2User4,
    ] = await Promise.all([
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          OrganizationId: organization1.Id,
          UserId: user1.Id,
          Role: EOrganizationUserRole.ADMIN,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          OrganizationId: organization1.Id,
          UserId: user2.Id,
          Role: EOrganizationUserRole.ADMIN,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          OrganizationId: organization1.Id,
          UserId: user3.Id,
          Role: EOrganizationUserRole.USER,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          OrganizationId: organization1.Id,
          UserId: user4.Id,
          Role: EOrganizationUserRole.USER,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          OrganizationId: organization2.Id,
          UserId: user1.Id,
          Role: EOrganizationUserRole.USER,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          OrganizationId: organization2.Id,
          UserId: user2.Id,
          Role: EOrganizationUserRole.USER,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          OrganizationId: organization2.Id,
          UserId: user3.Id,
          Role: EOrganizationUserRole.ADMIN,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          OrganizationId: organization2.Id,
          UserId: user4.Id,
          Role: EOrganizationUserRole.ADMIN,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
    ]);
    /***** ORGANIZATION USER END *****/

    /***** DEMO ITEM *****/
    const [
      demoItemOrganization1DemoItem1,
      demoItemOrganization1DemoItem2,
      demoItemOrganization2DemoItem1,
      demoItemOrganization2DemoItem2,
    ] = await Promise.all([
      this.demoItemService.createOne(
        this.defaultReq,
        {
          Name: 'Demo item 1 in organization 1',
          OrganizationId: organization1.Id,
        },
        CreateDemoItemDto,
        DemoItem,
      ),
      this.demoItemService.createOne(
        this.defaultReq,
        {
          Name: 'Demo item 2 in organization 1',
          OrganizationId: organization1.Id,
        },
        CreateDemoItemDto,
        DemoItem,
      ),
      this.demoItemService.createOne(
        this.defaultReq,
        {
          Name: 'Demo item 1 in organization 2',
          OrganizationId: organization1.Id,
        },
        CreateDemoItemDto,
        DemoItem,
      ),
      this.demoItemService.createOne(
        this.defaultReq,
        {
          Name: 'Demo item 2 in organization 2',
          OrganizationId: organization1.Id,
        },
        CreateDemoItemDto,
        DemoItem,
      ),
    ]);
    /***** DEMO ITEM END *****/
  }
}
