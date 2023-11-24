import { CrudConfigService } from '@indigolabs/crud';
import { crudGlobalConfig } from '@lib/shared/config/crud-global.config';
CrudConfigService.load(crudGlobalConfig);

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, { cors: true });
  const configService = app.get(ConfigService);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle(configService.getOrThrow<string>('SWAGGER_TITLE'))
    .setDescription(configService.getOrThrow<string>('SWAGGER_DESCRIPTION'))
    .setVersion(configService.getOrThrow<string>('SWAGGER_VERSION'))
    .setContact(
      configService.getOrThrow<string>('SWAGGER_CONTACT_NAME'),
      configService.getOrThrow<string>('SWAGGER_CONTACT_URL'),
      configService.getOrThrow<string>('SWAGGER_CONTACT_EMAIL'),
    )
    .setLicense(
      configService.getOrThrow<string>('SWAGGER_LICENSE_NAME'),
      configService.getOrThrow<string>('SWAGGER_LICENSE_URL'),
    )
    .setTermsOfService(
      configService.getOrThrow<string>('SWAGGER_TERMS_OF_SERVICE'),
    )
    .addBearerAuth()
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: 'http://localhost:8000/auth/v1/authorize',
          tokenUrl: 'http://localhost:8000/auth/token',
          scopes: {
            openid: 'OpenID scope',
            // Add other scopes here
          },
        },
      },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      oauth2RedirectUrl: 'REDIRECT_URL', // after successfully logging
      oauth: {
        clientId: 'CLIENT_ID',
      },
    },
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // App
  const port: number = configService.getOrThrow<number>('GENERAL_PORT');
  await app.listen(port);
}
bootstrap();
