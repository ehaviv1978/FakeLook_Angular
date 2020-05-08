#FROM nginx:1.17.9
FROM nginx:alpine
COPY /dist/fakelookApp /usr/share/nginx/html
EXPOSE 4200

# stage 1

# FROM node:alpine AS my-app-build
# WORKDIR /app
# COPY . .
# RUN npm install && npm run build

# # stage 2

# FROM nginx:alpine
# COPY --from=my-app-build /app/dist/fakelookApp /usr/share/nginx/html
# EXPOSE 4200