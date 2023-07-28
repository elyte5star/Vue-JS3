# build stage
FROM node:lts-alpine AS build-stage

# Set working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./

RUN npm install

# Copy rest of the files
COPY . .

# Build the project
RUN npm run build

# production stage
FROM nginx:stable-alpine AS production-stage


COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/templates/nginx.conf.template

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]