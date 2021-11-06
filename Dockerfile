FROM node:14

WORKDIR /usr/app/

COPY .npmrc ./
COPY ./package*.json ./

RUN npm install --only=prod
RUN rm -f .npmrc

COPY . .

ENV PORT 8080
EXPOSE ${PORT}

CMD ["npm", "start"]