FROM node:16.15.1-alpine
####### Install bash into Alpine
RUN apk add --no-cache bash
# Set working directory
WORKDIR /app
# Install app dependencies
COPY package.json ./
# Install Dependencies
RUN npm install -qy
# Copy app to container
COPY . .
EXPOSE 3001

# Run the "dev" script in package.json
CMD npm run dev