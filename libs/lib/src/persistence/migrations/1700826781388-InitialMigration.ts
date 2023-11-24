import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1700826781388 implements MigrationInterface {
  name = 'InitialMigration1700826781388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."EMediaType" AS ENUM('image', 'video')`,
    );
    await queryRunner.query(
      `CREATE TABLE "media" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreateDate" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedDate" TIMESTAMP NOT NULL DEFAULT now(), "Key" character varying NOT NULL, "Name" character varying NOT NULL, "Public" boolean NOT NULL DEFAULT false, "Type" "public"."EMediaType" NOT NULL, CONSTRAINT "UQ_f9afc237e3d733bddbdf44ba990" UNIQUE ("Key"), CONSTRAINT "PK_411484bcc0ddfd3bf561990e15e" PRIMARY KEY ("Id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."EUserRole" AS ENUM('USER', 'ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."EOnboardingStatus" AS ENUM('NOT_STARTED', 'COMPLETE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."EUserStatus" AS ENUM('ACTIVE', 'DISABLED', 'DELETED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreateDate" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedDate" TIMESTAMP NOT NULL DEFAULT now(), "Email" character varying, "Name" character varying, "Role" "public"."EUserRole" NOT NULL DEFAULT 'USER', "SocialAvatarUrl" character varying, "SupabaseId" character varying, "GoogleId" character varying, "AppleId" character varying, "FacebookId" character varying, "OnboardingStatus" "public"."EOnboardingStatus" NOT NULL DEFAULT 'NOT_STARTED', "Status" "public"."EUserStatus" NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "UQ_b7eee57d84fb7ed872e660197fb" UNIQUE ("Email"), CONSTRAINT "PK_1e4be10b13490bd87f4cc30c142" PRIMARY KEY ("Id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."EOrganizationUserRole" AS ENUM('USER', 'ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization-user" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreateDate" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedDate" TIMESTAMP NOT NULL DEFAULT now(), "Role" "public"."EOrganizationUserRole" NOT NULL DEFAULT 'USER', "organizationId" uuid, "userId" uuid, CONSTRAINT "PK_d8c1d88d0cf4ba4d3b34adafc1a" PRIMARY KEY ("Id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreateDate" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedDate" TIMESTAMP NOT NULL DEFAULT now(), "Name" character varying NOT NULL, "imageId" uuid, CONSTRAINT "REL_47b6a97e09895a06606a4a8042" UNIQUE ("imageId"), CONSTRAINT "PK_316fcc95a28c845d6288be481e9" PRIMARY KEY ("Id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "demo-item" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreateDate" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedDate" TIMESTAMP NOT NULL DEFAULT now(), "Name" character varying NOT NULL, "organizationId" uuid, CONSTRAINT "PK_4eba63cce488805cf5d16081132" PRIMARY KEY ("Id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization-user" ADD CONSTRAINT "FK_85bedf51b43dcfd3c80cdc01c2f" FOREIGN KEY ("organizationId") REFERENCES "organization"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization-user" ADD CONSTRAINT "FK_e3b273beb729efd4ea57ef92bfd" FOREIGN KEY ("userId") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "FK_47b6a97e09895a06606a4a80421" FOREIGN KEY ("imageId") REFERENCES "media"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "demo-item" ADD CONSTRAINT "FK_72eda455c0c969be4e8312b3f8d" FOREIGN KEY ("organizationId") REFERENCES "organization"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "demo-item" DROP CONSTRAINT "FK_72eda455c0c969be4e8312b3f8d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization" DROP CONSTRAINT "FK_47b6a97e09895a06606a4a80421"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization-user" DROP CONSTRAINT "FK_e3b273beb729efd4ea57ef92bfd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization-user" DROP CONSTRAINT "FK_85bedf51b43dcfd3c80cdc01c2f"`,
    );
    await queryRunner.query(`DROP TABLE "demo-item"`);
    await queryRunner.query(`DROP TABLE "organization"`);
    await queryRunner.query(`DROP TABLE "organization-user"`);
    await queryRunner.query(`DROP TYPE "public"."EOrganizationUserRole"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."EUserStatus"`);
    await queryRunner.query(`DROP TYPE "public"."EOnboardingStatus"`);
    await queryRunner.query(`DROP TYPE "public"."EUserRole"`);
    await queryRunner.query(`DROP TABLE "media"`);
    await queryRunner.query(`DROP TYPE "public"."EMediaType"`);
  }
}
