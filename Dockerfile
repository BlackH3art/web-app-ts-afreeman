FROM node:12.0.0

RUN mkdir -p /usr/src/web-app

COPY dist /usr/src/web-app/dist
COPY assets /usr/src/web-app/assets

COPY data.json /usr/src/web-app/
COPY server.js /usr/src/web-app/
COPY deploy-package.json /usr/src/web-app/package.json

WORKDIR /usr/src/web-app

RUN echo 'package-loc=false' >> .npmrc
RUN npm install

EXPOSE 4000

CMD ["node", "server.js"]