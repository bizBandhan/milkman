FROM node:26-alpine AS base 

WORKDIR /app

COPY package.json .
RUN npm install 

FROM base AS development

RUN chown node:node /app -R
COPY --chown=node:node . .

EXPOSE 5173 

CMD [ "npm","run","dev" ]
