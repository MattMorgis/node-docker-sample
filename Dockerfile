#
# ---- Base Node ----
FROM node:9 as base
WORKDIR /usr/src/app

#
# ---- Build ----
# run TypeScript compiler
FROM base AS build
COPY . .
RUN npm install
RUN npx tsc

#
# ---- Release ----
FROM base AS release
COPY package*.json ./
RUN npm install --production
COPY --from=build /usr/src/app/build ./build
COPY bin ./bin
COPY views ./views
ENV NODE_ENV=production
ENV APP_ENV=production
EXPOSE 3000
CMD node bin/www

