#
# ---- Base Node ----
FROM node:10 as base
WORKDIR /usr/src/app

#
# ---- Build ----
# run TypeScript compiler
FROM base AS build
COPY . .
RUN npm install
RUN npx tsc

#
# ---- Deps ----
# install productions deps
FROM base as deps
COPY . .
RUN npm install --production

#
# ---- Release ----
FROM base AS release
COPY package*.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build
COPY bin ./bin
COPY views ./views
ENV NODE_ENV=production
ENV APP_ENV=production
EXPOSE 3000
CMD node bin/www

