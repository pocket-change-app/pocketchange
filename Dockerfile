FROM node:16-alpine                   
WORKDIR /pocketchange
COPY package.json package-lock.json ./
RUN npm install
RUN mkdir ./backend
RUN mkdir ./backend/databases
RUN mkdir ./backend/graphql
RUN mkdir ./backend/databases/SQLSchema
RUN mkdir ./backend/databases/mongoSchema
RUN mkdir ./backend/graphql/schema
RUN mkdir ./backend/graphql/schema/Business
RUN mkdir ./backend/graphql/schema/Change
RUN mkdir ./backend/graphql/schema/Pocket
RUN mkdir ./backend/graphql/schema/User
RUN mkdir ./backend/graphql/schema/PocketManager
RUN mkdir ./backend/graphql/schema/Transaction
RUN mkdir ./backend/graphql/schema/helpers
COPY backend/package.json backend/package-lock.json ./backend/
RUN npm install
RUN npm install -g  nodemon
COPY . .
EXPOSE 4000
CMD expo start
## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
WORKDIR ./backend/graphql
CMD nodemon start
