## Common/Base stage
FROM node:18 AS base
ENV NODE_ENV=production
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --ignore-scripts --production && yarn cache clean

## Build image stage
FROM base AS build
ENV NODE_ENV=development
ARG APP
COPY . .
RUN yarn --frozen-lockfile --ignore-scripts
RUN yarn build:${APP}

## Production image stage
FROM node:18-alpine AS prod
ENV NODE_ENV=production
ARG APP
WORKDIR /app
COPY --from=base --chown=node:node /app/node_modules ./node_modules
COPY --from=base --chown=node:node /app/*.json ./
COPY --from=build --chown=node:node /app/dist ./dist/
USER node
ENV APP_MAIN_FILE=dist/apps/sportion-${APP}/main.js
CMD node ${APP_MAIN_FILE}