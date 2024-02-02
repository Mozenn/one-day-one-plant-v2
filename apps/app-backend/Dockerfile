FROM node:20-alpine

WORKDIR /user/src/app

COPY . .

ENV DATABASE_URL='postgresql://dev:pwd@postgres:5432/odop_core'
 
RUN npm ci --omit=dev

RUN npx prisma generate
 
RUN npm run build
 
USER node

CMD ["npm", "run", "start:prod"]