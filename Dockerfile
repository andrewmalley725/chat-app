FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --only=production

COPY server/package*.json server/
RUN npm run install-server --only=production

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000

# docker run -it -p 8000:8000 andrewmalley725/express-chat-app
# docker build . --platform=linux/amd64 -t andrewmalley725/express-chat-app