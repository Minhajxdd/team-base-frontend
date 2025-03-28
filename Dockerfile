FROM node:20.12-alpine3.18 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx ng build --configuration production

FROM nginx:1.25.3-alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN touch /var/run/nginx.pid && \
  mkdir -p /var/cache/nginx && \
  chown -R nginx:nginx /var/run/nginx.pid && \
  chown -R nginx:nginx /var/log/nginx && \
  chown -R nginx:nginx /etc/nginx/nginx.conf && \
  chown -R nginx:nginx /var/cache/nginx

USER nginx

COPY --from=build /app/dist/team-base/browser /usr/share/nginx/html/

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]