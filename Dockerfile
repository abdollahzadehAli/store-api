FROM node:18

# Initialize directory
RUN mkdir -p /app
WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install --quiet --no-progress

COPY . .


# Build app
RUN npm run build


CMD [ "npm", "run", "start:prod"]