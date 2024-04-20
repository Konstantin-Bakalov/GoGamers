FROM node:20-alpine

RUN mkdir app
WORKDIR /app

COPY shared/package.json ./shared/
RUN cd shared && npm install
COPY shared/ ./shared/
RUN cd shared && npm run build

COPY server/package.json ./server/
RUN cd server && npm install
COPY server/ ./server/

EXPOSE 80
CMD ["npm", "start", "--prefix", "server"]