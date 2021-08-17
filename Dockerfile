FROM node:12-alpine

COPY index.js /index.js
COPY ["package.json", "package-lock.json*", "./"]

RUN npm i

RUN npm i -g arweave-deploy@1.9.0

ENTRYPOINT ["node", "/index.js"]