FROM node:6
EXPOSE 3000
RUN npm install forever -g
COPY . /usr/src/app
WORKDIR /usr/src/app
ENTRYPOINT forever start index.js
