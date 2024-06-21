# Use the official Angular image as base
FROM node:22 AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Use Nginx to serve the Angular app
FROM nginx:latest
COPY --from=builder /usr/src/app/dist/client /usr/share/nginx/html
