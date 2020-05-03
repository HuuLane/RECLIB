FROM node:lts-alpine as ui-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM scratch
COPY --from=ui-build /app/dist /app/dist