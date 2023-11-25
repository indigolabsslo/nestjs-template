import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1700919327264 implements MigrationInterface {
  name = 'InitialMigration1700919327264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."EMediaType" AS ENUM('image', 'video')`,
    );
    await queryRunner.query(
      `CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "key" character varying NOT NULL, "name" character varying NOT NULL, "public" boolean NOT NULL DEFAULT false, "type" "public"."EMediaType" NOT NULL, CONSTRAINT "UQ_b305063b0a030ab458c128078c7" UNIQUE ("key"), CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization-role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "permissions" text array NOT NULL, "organizationId" uuid, CONSTRAINT "PK_ca4882382cf2c7f6960f2bc06d5" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying, "name" character varying, "role" "public"."EUserRole" NOT NULL DEFAULT 'USER', "socialAvatarUrl" character varying, "supabaseId" character varying, "googleId" character varying, "appleId" character varying, "facebookId" character varying, "onboardingStatus" "public"."EOnboardingStatus" NOT NULL DEFAULT 'NOT_STARTED', "status" "public"."EUserStatus" NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization-user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "organizationId" uuid, "userId" uuid, "organizationRoleId" uuid, CONSTRAINT "PK_cc1b05b02e8034ff4afcfb13769" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "imageId" uuid, CONSTRAINT "REL_47b6a97e09895a06606a4a8042" UNIQUE ("imageId"), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "demo-item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "organizationId" uuid, CONSTRAINT "PK_f77fa9f2d6a35e7e6af12bc598b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization-role" ADD CONSTRAINT "FK_6db815a4ca44fcf4a518c0b8686" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization-user" ADD CONSTRAINT "FK_85bedf51b43dcfd3c80cdc01c2f" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization-user" ADD CONSTRAINT "FK_e3b273beb729efd4ea57ef92bfd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization-user" ADD CONSTRAINT "FK_2fd0d6ea9a12b8c35bd1c5b78b7" FOREIGN KEY ("organizationRoleId") REFERENCES "organization-role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ADD CONSTRAINT "FK_47b6a97e09895a06606a4a80421" FOREIGN KEY ("imageId") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "demo-item" ADD CONSTRAINT "FK_72eda455c0c969be4e8312b3f8d" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "organization-user" DROP CONSTRAINT "FK_2fd0d6ea9a12b8c35bd1c5b78b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization-user" DROP CONSTRAINT "FK_e3b273beb729efd4ea57ef92bfd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization-user" DROP CONSTRAINT "FK_85bedf51b43dcfd3c80cdc01c2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization-role" DROP CONSTRAINT "FK_6db815a4ca44fcf4a518c0b8686"`,
    );
    await queryRunner.query(`DROP TABLE "demo-item"`);
    await queryRunner.query(`DROP TABLE "organization"`);
    await queryRunner.query(`DROP TABLE "organization-user"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."EUserStatus"`);
    await queryRunner.query(`DROP TYPE "public"."EOnboardingStatus"`);
    await queryRunner.query(`DROP TYPE "public"."EUserRole"`);
    await queryRunner.query(`DROP TABLE "organization-role"`);
    await queryRunner.query(`DROP TABLE "media"`);
    await queryRunner.query(`DROP TYPE "public"."EMediaType"`);
  }
}
