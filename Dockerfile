# base image
FROM node:11.1.0

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent

# Expose PORT 3000 on our container so we can run our server
EXPOSE 3000
