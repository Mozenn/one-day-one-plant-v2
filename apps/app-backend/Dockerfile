FROM node:20-alpine

WORKDIR /user/src/app

COPY . .

RUN npm ci --omit=dev

RUN npx prisma generate
 
RUN npm run build
 
USER node

CMD ["npm", "run", "start:prod"]