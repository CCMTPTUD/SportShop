FROM node:20-alpine AS build

WORKDIR /app

# Accept VITE_API_URL as build argument (default to localhost for dev)
ARG VITE_API_URL=http://localhost:5000

COPY package*.json ./
RUN npm ci

COPY . .

# Pass build arg to npm run build via environment variable
RUN VITE_API_URL=$VITE_API_URL npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]