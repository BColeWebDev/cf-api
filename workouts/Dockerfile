FROM node:18-alpine as base
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["node", "src/index.ts"]
EXPOSE 8002

FROM base as production

ENV NODE_PATH=./build

RUN npm run build


