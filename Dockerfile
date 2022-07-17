FROM node:16-alpine
WORKDIR /pocketchange
COPY package*.json ./
RUN npm install
COPY ./backend ./backend
RUN npm install ./backend
RUN npm install -g nodemon
EXPOSE 4000
## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
WORKDIR /pocketchange/backend/graphql
CMD nodemon start
