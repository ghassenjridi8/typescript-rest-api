# Use an official node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and the package-lock.json files to the container
COPY . .

# Install the dependencies
RUN npm install

# Compile TypeScript files to javascript
RUN npm run build

# Expose the port that the app runs on
EXPOSE 9002

# Define the command to run your application
CMD ["node", "dist/server.js"]


