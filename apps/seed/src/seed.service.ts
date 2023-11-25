/* eslint-disable @typescript-eslint/no-unused-vars */
import { CrudRequest } from '@indigolabs/crud';
import { DemoItem } from '@lib/demo-item/demo-item.entity';
import { DemoItemService } from '@lib/demo-item/demo-item.service';
import { CreateDemoItemDto } from '@lib/demo-item/dtos/create-demo-item.dto';
import { MediaService } from '@lib/media/media.service';
import { CreateOrganizationRoleDto } from '@lib/organization-role/dtos/create-organization-role.dto';
import { OrganizationRole } from '@lib/organization-role/organization-role.entity';
import { OrganizationRoleService } from '@lib/organization-role/organization-role.service';
import { CreateOrganizationUserDto } from '@lib/organization-user/dtos/create-organization-user.dto';
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
    private organizationRoleService: OrganizationRoleService,
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
          email: 'admin@indigo.si',
          name: 'Admin',
          role: EUserRole.ADMIN,
          appleId: null,
          avatarId: null,
          facebookId: null,
          supabaseId: null,
          googleId: null,
          socialAvatarUrl: null,
          onboardingStatus: EOnboardingStatus.COMPLETE,
          status: EUserStatus.ACTIVE,
        },
        CreateUserDto,
        User,
      ),
      this.userService.createOne(
        this.defaultReq,
        {
          email: 'user1@indigo.si',
          name: 'User 1',
          role: EUserRole.USER,
          appleId: null,
          avatarId: null,
          facebookId: null,
          supabaseId: null,
          googleId: null,
          socialAvatarUrl: null,
          onboardingStatus: EOnboardingStatus.COMPLETE,
          status: EUserStatus.ACTIVE,
        },
        CreateUserDto,
        User,
      ),
      this.userService.createOne(
        this.defaultReq,
        {
          email: 'user2@indigo.si',
          name: 'User 2',
          role: EUserRole.USER,
          appleId: null,
          avatarId: null,
          facebookId: null,
          supabaseId: null,
          googleId: null,
          socialAvatarUrl: null,
          onboardingStatus: EOnboardingStatus.COMPLETE,
          status: EUserStatus.ACTIVE,
        },
        CreateUserDto,
        User,
      ),
      this.userService.createOne(
        this.defaultReq,
        {
          email: 'user3@indigo.si',
          name: 'User 3',
          role: EUserRole.USER,
          appleId: null,
          avatarId: null,
          facebookId: null,
          supabaseId: null,
          googleId: null,
          socialAvatarUrl: null,
          onboardingStatus: EOnboardingStatus.COMPLETE,
          status: EUserStatus.ACTIVE,
        },
        CreateUserDto,
        User,
      ),
      this.userService.createOne(
        this.defaultReq,
        {
          email: 'user4@indigo.si',
          name: 'User 4',
          role: EUserRole.USER,
          appleId: null,
          avatarId: null,
          facebookId: null,
          supabaseId: null,
          googleId: null,
          socialAvatarUrl: null,
          onboardingStatus: EOnboardingStatus.COMPLETE,
          status: EUserStatus.ACTIVE,
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
          name: 'Organization 1',
          imageId: organization1Image.id,
        },
        CreateOrganizationDto,
        Organization,
      ),
      this.organizationService.createOne(
        this.defaultReq,
        {
          name: 'Organization 2',
          imageId: organization2Image.id,
        },
        CreateOrganizationDto,
        Organization,
      ),
    ]);
    /***** ORGANIZATION END *****/

    /***** ORGANIZATION ROLE *****/
    const organizationAdminPermissions = [
      'OrganizationRole-Create-One',
      'OrganizationRole-Read-All',
      'OrganizationRole-Read-One',
      'OrganizationRole-Replace-One',
      'OrganizationRole-Update-One',
      'OrganizationRole-Delete-One',
      'OrganizationUser-Create-One',
      'OrganizationUser-Read-All',
      'OrganizationUser-Read-One',
      'OrganizationUser-Replace-One',
      'OrganizationUser-Update-One',
      'OrganizationUser-Delete-One',
      'OrganizationDemoItem-Create-One',
      'OrganizationDemoItem-Read-All',
      'OrganizationDemoItem-Read-One',
      'OrganizationDemoItem-Replace-One',
      'OrganizationDemoItem-Update-One',
      'OrganizationDemoItem-Delete-One',
    ];
    const organizationUserPermissions = [
      'OrganizationDemoItem-Create-One',
      'OrganizationDemoItem-Read-All',
      'OrganizationDemoItem-Read-One',
      'OrganizationDemoItem-Replace-One',
      'OrganizationDemoItem-Update-One',
      'OrganizationDemoItem-Delete-One',
    ];

    const [
      organizationRoleAdminOrganization1,
      organizationRoleUserOrganization1,
      organizationRoleAdminOrganization2,
      organizationRoleUserOrganization2,
    ] = await Promise.all([
      this.organizationRoleService.createOne(
        this.defaultReq,
        {
          name: 'Organization Role - Admin',
          organizationId: organization1.id,
          permissions: organizationAdminPermissions,
        },
        CreateOrganizationRoleDto,
        OrganizationRole,
      ),
      this.organizationRoleService.createOne(
        this.defaultReq,
        {
          name: 'Organization Role - User',
          organizationId: organization1.id,
          permissions: organizationUserPermissions,
        },
        CreateOrganizationRoleDto,
        OrganizationRole,
      ),
      this.organizationRoleService.createOne(
        this.defaultReq,
        {
          name: 'Organization Role - Admin',
          organizationId: organization2.id,
          permissions: organizationAdminPermissions,
        },
        CreateOrganizationRoleDto,
        OrganizationRole,
      ),
      this.organizationRoleService.createOne(
        this.defaultReq,
        {
          name: 'Organization Role - User',
          organizationId: organization2.id,
          permissions: organizationUserPermissions,
        },
        CreateOrganizationRoleDto,
        OrganizationRole,
      ),
    ]);
    /***** ORGANIZATION ROLE END *****/

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
          organizationId: organization1.id,
          userId: user1.id,
          organizationRoleId: organizationRoleAdminOrganization1.id,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          organizationId: organization1.id,
          userId: user2.id,
          organizationRoleId: organizationRoleAdminOrganization1.id,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          organizationId: organization1.id,
          userId: user3.id,
          organizationRoleId: organizationRoleUserOrganization1.id,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          organizationId: organization1.id,
          userId: user4.id,
          organizationRoleId: organizationRoleUserOrganization1.id,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          organizationId: organization2.id,
          userId: user1.id,
          organizationRoleId: organizationRoleUserOrganization2.id,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          organizationId: organization2.id,
          userId: user2.id,
          organizationRoleId: organizationRoleUserOrganization2.id,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          organizationId: organization2.id,
          userId: user3.id,
          organizationRoleId: organizationRoleAdminOrganization2.id,
        },
        CreateOrganizationUserDto,
        OrganizationUser,
      ),
      this.organizationUserService.createOne(
        this.defaultReq,
        {
          organizationId: organization2.id,
          userId: user4.id,
          organizationRoleId: organizationRoleAdminOrganization2.id,
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
          name: 'Demo item 1 in organization 1',
          organizationId: organization1.id,
        },
        CreateDemoItemDto,
        DemoItem,
      ),
      this.demoItemService.createOne(
        this.defaultReq,
        {
          name: 'Demo item 2 in organization 1',
          organizationId: organization1.id,
        },
        CreateDemoItemDto,
        DemoItem,
      ),
      this.demoItemService.createOne(
        this.defaultReq,
        {
          name: 'Demo item 1 in organization 2',
          organizationId: organization1.id,
        },
        CreateDemoItemDto,
        DemoItem,
      ),
      this.demoItemService.createOne(
        this.defaultReq,
        {
          name: 'Demo item 2 in organization 2',
          organizationId: organization1.id,
        },
        CreateDemoItemDto,
        DemoItem,
      ),
    ]);
    /***** DEMO ITEM END *****/
  }
}
