FROM node

WORKDIR /app

COPY backend/package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

