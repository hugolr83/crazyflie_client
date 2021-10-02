FROM node:14-bullseye-slim as builder

WORKDIR /client

COPY ./client  ./

RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=builder /client/dist/client /usr/share/nginx/html

EXPOSE 80