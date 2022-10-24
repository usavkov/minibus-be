# syntax=docker/dockerfile:1

FROM node:lts-alpine3.15 as base

# Install dependencies
FROM base as deps
WORKDIR /root
COPY package*.json /root/
RUN npm ci

# Create production build of the app
FROM deps as build
COPY . .
RUN npm run build && npm prune --production

# Get only production resources to start the app
FROM base as prod
WORKDIR /app
COPY --from=build /root/node_modules/ ./node_modules
COPY --from=build /root/dist/ ./dist
COPY --from=build /root/package*.json ./

EXPOSE ${PORT}

CMD ["node", "dist/main"]
