FROM node:14-bullseye-slim as builder

WORKDIR /client
COPY ./ ./

RUN npm install && npm run build

FROM nginx:latest

COPY --from=builder /client/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
