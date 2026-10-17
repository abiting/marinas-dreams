FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY scripts ./scripts
COPY src ./src
COPY assets ./assets
RUN node scripts/build.mjs
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "scripts/serve.mjs"]
