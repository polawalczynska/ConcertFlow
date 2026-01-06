FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY --from=build /app/build ./build
# Create public directory (Remix may not have one, but it's safe to create empty)
RUN mkdir -p ./public

COPY remix.config.ts ./
COPY vite.config.ts ./

RUN addgroup -g 1001 -S nodejs && \
    adduser -S remix -u 1001

RUN chown -R remix:nodejs /app

USER remix

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

CMD ["npm", "start"]

