
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install, npm install dotenv, npm install sequelize, npm install express, npm install bcrypt, npm install jsonwebtoken

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]