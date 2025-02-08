FROM node
WORKDIR /src/app

COPY package*.json .

RUN npm install
COPY . .
RUN npm run build
WORKDIR /src/app/dist/llmhub/browser/
CMD ["npx", "serve", "-s", "."]
