### STAGE 1: Build ###
FROM node:14.15.4-alpine AS build
WORKDIR /usr/src/app
COPY ./dist ./dist
### STAGE 2: Run ###
FROM nginx:1.19.6-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
