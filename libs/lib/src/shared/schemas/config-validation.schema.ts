import * as Joi from 'joi';

export default Joi.object({
  // GENERAL
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  GENERAL_PORT: Joi.number().default(3000),
  // SWAGGER
  SWAGGER_TITLE: Joi.string().default('NestJS API'),
  SWAGGER_DESCRIPTION: Joi.string().default('NestJS API'),
  SWAGGER_VERSION: Joi.string().default('v1.0.0'),
  SWAGGER_CONTACT_NAME: Joi.string().default('Indigo Labs'),
  SWAGGER_CONTACT_URL: Joi.string().default('https://indigo.si'),
  SWAGGER_CONTACT_EMAIL: Joi.string().default('info@indigo.si'),
  SWAGGER_LICENSE_NAME: Joi.string().default('Indigo Labs License'),
  SWAGGER_LICENSE_URL: Joi.string().default('https://indigo.si'),
  SWAGGER_TERMS_OF_SERVICE: Joi.string().default('https://indigo.si'),
  SWAGGER_AUTHORIZATION_URL: Joi.string().default('http://localhost:8000'),
  SWAGGER_TOKEN_URL: Joi.string().default('http://localhost:8000'),
  // TYPEORM
  TYPEORM_CONNECTION: Joi.string().default('postgres'),
  TYPEORM_HOST: Joi.string().default('localhost'),
  TYPEORM_USERNAME: Joi.string().default('supabase_admin'),
  TYPEORM_PASSWORD: Joi.string().default(
    'your-super-secret-and-long-postgres-password',
  ),
  TYPEORM_DATABASE: Joi.string().default('postgres'),
  TYPEORM_SCHEMA: Joi.string().default('public'),
  TYPEORM_PORT: Joi.number().default(5432),
  TYPEORM_SYNCHRONIZE: Joi.string().default('false'),
  TYPEORM_MIGRATIONS_RUN: Joi.string().default('true'),
  TYPEORM_LOGGING: Joi.string().default('true'),
  TYPEORM_MAX_CONNECTION_POOL_SIZE: Joi.number().default(10),
  // REDIS
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_TTL: Joi.number().default(3600),
  REDIS_DB: Joi.number().default(0),
  // REDIS_PASSWORD: Joi.string().default('redis-password'),
  // SUPABSE
  SUPABASE_URL: Joi.string().default('http://localhost:8000'),
  SUPABASE_KEY: Joi.string().default(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q',
  ),
  SUPABASE_JWT_SECRET: Joi.string().default(
    'your-super-secret-jwt-token-with-at-least-32-characters-long',
  ),
  SUPABASE_BUCKET: Joi.string().default('local'),
  SUPABASE_SIGNED_URL_EXPIRATION: Joi.number().default(3600),
  // THROTTLE
  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(60),
  // SEED
  SEED_FILES_PATH: Joi.string().default('./files'),
});
