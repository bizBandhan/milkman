FROM node:26-slim AS base
WORKDIR /app
COPY package*.json ./

FROM base AS development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

FROM node:26-slim AS production
WORKDIR /app
RUN npm install -g pm2
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
ENV NODE_ENV=production
CMD ["npm","run","prod"]
