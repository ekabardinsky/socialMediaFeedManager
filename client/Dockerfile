FROM node:carbon AS application

# Create app directory
WORKDIR /usr/src/media-manager-app

# Install app dependencies
# A wildcard is used to ensure both package.json AND
# package-lock.json are copied where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build app
RUN npm run build

FROM nginx

COPY --from=application  /usr/src/media-manager-app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

