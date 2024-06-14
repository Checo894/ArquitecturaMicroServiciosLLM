FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install bcrypt --build-from-source

COPY . .

CMD ["node", "index.js"]
