FROM node:10

RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend
COPY .\ .

RUN npm install
RUN ls .