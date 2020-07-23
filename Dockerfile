FROM node:10-alpine

RUN mkdir -p /home/node/covidproj/node_modules && chown -R node:node /home/node/covidproj

WORKDIR /home/node/covidproj

COPY covid19/package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]
