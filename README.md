# Simple Article Web Service

> Note:
> - For development and test, application just can running in local
> - Docker just running for production

### STEP for Running in LOCAL
> Note :
> - make sure in your local have installed nodejs, redis and postgres v.13 
> - redis must be connect before running this app

1. Clone this repository in your local

2. Create file ```.env``` and copy paste file .env.example into it. Change value for 
``` DB_USERNAME_DEVELOPMENT, DB_PASSWORD_DEVELOPMENT, DB_USERNAME_TEST, DB_PASSWORD_DEVELOPMENT ``` 
according to your local postgres.

3. Default this app running on port 3000, so make sure there are not other server running on that port. Or you feel free to change value ```PORT``` in file .env.

4.  run this command 
```
npm i && npm run db:create:dev && npm run db:create:test && npm run db:migrate:dev && npm run db:migrate:test
```

5. run this command for testing this app and running app for development
```
npm test && npm run dev
```
#
### STEP for Running in DOCKER
> Note:
> - make sure you have installed docker in your local
> - because this app binding with local and run on port 3001, so make sure there are not other server running on that port. or you can custom that port in file docker-compose.yml
1. run this command 
```
docker-compose up
```