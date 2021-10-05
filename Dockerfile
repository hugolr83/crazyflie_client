FROM node:14-bullseye-slim as builder

WORKDIR /client
COPY angular.json package.json package-lock.json tsconfig.app.json tsconfig.json .npmrc ./
COPY src ./src

RUN npm ci && npm run build --prod

FROM nginx:latest

COPY --from=builder /client/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
