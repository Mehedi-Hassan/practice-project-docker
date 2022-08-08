FROM node:alpine
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm install

EXPOSE 3013

CMD ["npm", "start"]