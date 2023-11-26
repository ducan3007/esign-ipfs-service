FROM node:18.15.0-slim

WORKDIR /esign-ipfs

COPY . /esign-ipfs

RUN yarn install
RUN yarn run generate
RUN yarn build

EXPOSE 6009
EXPOSE 6010

CMD ["node","dist/main.js"]