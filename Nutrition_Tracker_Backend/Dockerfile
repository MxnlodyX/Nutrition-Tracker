# -------- Build stage --------
FROM oven/bun:1 as build-stage
WORKDIR /app

COPY package.json bun.lock ./
COPY tsconfig.json ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# -------- Production stage --------
FROM oven/bun:1-slim as production-stage
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --production --frozen-lockfile

COPY --from=build-stage /app/dist ./dist

EXPOSE 3002
CMD ["bun", "run", "start"]
