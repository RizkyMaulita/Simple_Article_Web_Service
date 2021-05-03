FROM node:latest

WORKDIR /home/tech_test/node/rizky_maulita_putri/article_web_service

COPY . .

ENV PORT=3000 \
    DB_USERNAME_DEVELOPMENT=postgres \
    DB_PASSWORD_DEVELOPMENT=postgres \
    DB_NAME_DEVELOPMENT=article_staging \
    DB_HOST_DEVELOPMENT=postgres \
    DB_DIALECT_DEVELOPMENT=postgres \
    DB_USERNAME_TEST=postgres \
    DB_PASSWORD_TEST=postgres \
    DB_NAME_TEST=article_staging_test \
    DB_HOST_TEST=postgres \
    DB_DIALECT_TEST=postgres \
    ARTICLE_KEY_REDIS=staging_article \
    REDIS_HOST=redis

RUN env

RUN npm install -g nodemon

RUN npm install && npm cache clean --force

# RUN npm run db:create:dev

# RUN npm run db:create:test

# RUN npx sequelize db:migrate

# RUN npm run db:migrate:test


EXPOSE 3000

CMD ["npm", "run", "dev"]