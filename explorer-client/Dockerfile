FROM node:14-alpine
WORKDIR '/usr/src/app'
RUN apk add yarn
COPY ./package.json ./
RUN yarn install
COPY . .
CMD ["yarn" ,"start"]