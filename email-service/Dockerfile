# Base image
FROM node:16.13.1

# Create app directory
WORKDIR /app

# Set environment variables
ENV PORT=3011 \
    MONGO_URI=mongodb+srv://chamath:chamath@clusterx.kanecsb.mongodb.net/?retryWrites=true&w=majority \
    JWT_EXPIRE=30 \
    NODE_ENV=development \
    JWT_SECRET=secret \
    BCRYPT_SALT_ROUNDS=10 \
    MAIL_HOST= \
    MAIL_USER= \
    MAIL_PASSWORD= \
    APP_DOMAIN=http://localhost:3011 \
    USER=tl685998@gmail.com \
    PASSWORD=vrlaqcyqjufvwibc \
    SEND_TO= \
    CLIENT_URL=http://localhost:3000

# Install app dependencies
COPY package*.json ./
RUN yarn 

# Copy app files
COPY . .

# Build production app
RUN yarn run build 

# Expose app port
EXPOSE 3011

# Start app
CMD ["yarn", "dev"]
