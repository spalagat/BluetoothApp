FROM node:10-alpine

RUN mkdir -p /home/ec2-user/node/BluetoothApp/public/node_modules && chown -R node:node /home/ec2-user/node/BluetoothApp

WORKDIR /home/ec2-user/node/BluetoothApp/public

COPY public/package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]
