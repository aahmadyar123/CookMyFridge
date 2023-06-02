# Use the official Node.js 18.15.0 image as the base image
FROM node:18.15.0

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN yarn install

# Copy the entire project directory to the container
COPY . .

# Specify the command to start your application
CMD ["npm", "start"]
