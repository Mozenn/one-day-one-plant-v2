FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY . .

FROM base AS build
RUN pnpm install --prod 
RUN pnpm run build
 
FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

USER node

CMD ["pnpm", "run", "start:prod"]