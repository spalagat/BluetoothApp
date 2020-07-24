FROM node:10-alpine

RUN mkdir -p /home/node/bluetoothApp/public/node_modules && chown -R node:node /home/node/bluetoothApp

WORKDIR /home/node/bluetoothApp

COPY public/package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]
