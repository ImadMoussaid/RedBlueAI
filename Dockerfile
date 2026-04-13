FROM node:22-alpine AS base
WORKDIR /app
COPY package.json tsconfig.json next.config.ts next-env.d.ts ./
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY prisma ./prisma
COPY worker ./worker
RUN mkdir -p /app/data/reports /app/data/evidence
EXPOSE 3000
CMD ["sh", "-c", "npm install && npm run dev"]
