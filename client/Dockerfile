FROM node:20-alpine

RUN mkdir app
WORKDIR /app

COPY shared/package.json ./shared/
RUN cd shared && npm install
COPY shared/ ./shared/
RUN cd shared && npm run build

COPY client/package.json ./client/
RUN cd client && npm install --force
COPY client/ ./client/

EXPOSE 80
CMD ["npm", "start", "--prefix", "client"]