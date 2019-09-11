FROM node:slim

# Create app directory
WORKDIR /usr/src/media-manager-app

# Install app dependencies
# A wildcard is used to ensure both package.json AND
# package-lock.json are copied where available (npm@5+)
COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y ffmpeg

# Bundle app source
COPY . .

# Start app
CMD npm run start

