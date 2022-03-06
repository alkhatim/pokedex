FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm test

CMD ["npm", "start"]