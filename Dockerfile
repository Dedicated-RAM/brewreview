FROM node:18 as dev
RUN apt-get update && apt-get install -y git
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run dev