FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install -g typescript
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5050
CMD ["npm", "start"]