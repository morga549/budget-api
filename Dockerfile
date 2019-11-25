FROM node:latest

ENV PORT=3000

WORKDIR /BUDGET-API    

COPY . . 

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "node", "app.js" ]
