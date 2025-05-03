FROM node:20-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml pnpm-lock.yaml
COPY package.json package.json

RUN pnpm install

COPY tsconfig.json tsconfig.json
COPY src src

RUN pnpm tsc

RUN pnpm prune --prod
RUN rm -rf pnpm-lock.yaml tsconfig.json src

CMD ["node", "dist/index.js"]