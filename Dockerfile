# syntax=docker/dockerfile:1

FROM node:lts-alpine3.15 as base

# Install dependencies
FROM base as deps
WORKDIR /root
COPY package*.json yarn.lock /root/
RUN yarn install --prod

# Create production build of the app
FROM deps as build
COPY . .
RUN yarn add @nestjs/cli
RUN yarn build

# Get only production resources to start the app
FROM base as prod
WORKDIR /app
COPY --from=build /root/dist/ ./dist
COPY --from=deps /root/node_modules/ ./node_modules
COPY --from=deps /root/package*.json ./

EXPOSE ${PORT}

CMD ["yarn", "start:prod"]
