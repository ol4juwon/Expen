From node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./usr/src/app

RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]

