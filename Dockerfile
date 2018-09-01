FROM node:10-alpine

EXPOSE 80

RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend
COPY .\ .

RUN npm install