FROM node:lts-alpine

WORKDIR /www

ADD ./package.json ./yarn.lock /www/
RUN yarn install \
	&& yarn cache clean;

ADD ./ /www

CMD ["yarn", "prod"]
