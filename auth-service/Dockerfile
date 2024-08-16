# Use Node.js base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the common directory to the container
COPY ../common ./common

COPY ../config.js ./config.js


COPY package*.json ./


# Copy the service-specific code to the container
COPY auth-service .



# Install dependencies
RUN npm install

# Install module-alias globally (optional)
RUN npm install -g module-alias

# Set the NODE_PATH (optional, for module-alias)
ENV NODE_PATH=/usr/src/app

ENV NODE_ENV=docker
ENV JWT_SECRET=YHscJUd4ZnYCf8Mx9KMLznagI8w7/n5JVG4RI9uyaPI=



# Expose the port the service will run on
EXPOSE 5000

# Command to run the service
CMD ["node", "index.js"]