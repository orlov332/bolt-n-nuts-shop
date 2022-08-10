# Build assembly
FROM node:16 as builder

# Create app directory
WORKDIR /usr/src/app

# Install all app dependencies
COPY package*.json ./
RUN npm install

# Copy sources and build project
COPY . .
RUN npm run build

# Optimized run assembly
FROM node:16-alpine

WORKDIR /usr/src/app

# Install only prod app dependencies
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci

# Copy app
COPY --from=builder /usr/src/app/dist/ ./dist/

USER node

EXPOSE 4000

CMD ["node", "dist/main" ]
