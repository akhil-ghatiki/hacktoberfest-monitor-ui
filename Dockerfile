FROM node:10.16.3 as source
WORKDIR /opt/app
COPY ./package.json ./
RUN npm install --production
COPY . ./
RUN npm run build

FROM nginx:1.17.4
WORKDIR /opt/app
COPY --from=source /opt/app/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000 80
CMD ["nginx",  "-g",  "daemon off;"]
