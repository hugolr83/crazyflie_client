# Inspired from https://dev.to/oneofthedevs/docker-angular-nginx-37e4

FROM node:14-bullseye-slim as builder

WORKDIR /client

RUN npm cache clean --force

COPY angular.json package.json package-lock.json tsconfig.app.json tsconfig.json .npmrc ./
COPY src ./src

RUN npm ci && npm run build --prod

FROM nginx:latest

COPY --from=builder /client/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
