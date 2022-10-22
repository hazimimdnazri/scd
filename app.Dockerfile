FROM node:18.11-alpine

WORKDIR /var/www/app

COPY app/package.json ./
COPY app/yarn.lock ./

RUN yarn install

COPY  ./app .

CMD [ "yarn", "start" ]
