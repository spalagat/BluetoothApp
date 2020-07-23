FROM node:10-alpine

RUN mkdir -p /home/palagati_s/nodeProjects/BluetoothApp/node_modules && chown -R node:node /home/palagati_s/nodeProjects/BluetoothApp

WORKDIR /home/palagati_s/nodeProjects/BluetoothApp

COPY /package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 80:80

CMD [ "node", "app.js" ]
