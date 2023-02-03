FROM node:14

WORKDIR /root/app

CMD npm install && npm start -- --host 0.0.0.0

EXPOSE 3000


