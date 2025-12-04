# Stage 1: Builder for dependencies
FROM node:24-alpine AS deps

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

FROM node:24-alpine

RUN apk add --no-cache curl

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]