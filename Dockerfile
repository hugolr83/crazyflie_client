# syntax=docker/dockerfile:1
FROM node:12.18.1

WORKDIR /client

COPY ["./client/package.json", "./client/package-lock.json", "./"]

RUN npm install

COPY ./client .

EXPOSE 4200

CMD ["npm", "start"]