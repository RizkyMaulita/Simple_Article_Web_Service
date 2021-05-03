FROM node:latest

WORKDIR /home/tech_test/node/rizky_maulita_putri/article_web_service

COPY package*.json ./

ENV PORT=3000 \
    DB_USERNAME_DEVELOPMENT=postgres \
    DB_PASSWORD_DEVELOPMENT=postgres \
    DB_NAME_DEVELOPMENT=article_staging \
    DB_HOST_DEVELOPMENT=postgres \
    DB_DIALECT_DEVELOPMENT=postgres \
    DB_USERNAME_PRODUCTION=postgres \
    DB_PASSWORD_PRODUCTION=postgres \
    DB_NAME_PRODUCTION=article_production \
    DB_HOST_PRODUCTION=postgres \
    DB_DIALECT_PRODUCTION=postgres \
    DB_USERNAME_TEST=postgres \
    DB_PASSWORD_TEST=postgres \
    DB_NAME_TEST=article_staging_test \
    DB_HOST_TEST=postgres \
    DB_DIALECT_TEST=postgres \
    ARTICLE_KEY_REDIS=article \
    REDIS_HOST=redis

RUN env

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000

CMD ["npm", "start"]