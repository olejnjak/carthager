# Use Node.js image
FROM node:22

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npx", "ts-node", "index.ts"]