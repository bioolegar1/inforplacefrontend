# ==================== BUILD STAGE ====================
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .
# Sintaxe CORRETA para Angular 19+
RUN npm run build -- --configuration production

# ==================== RUNTIME STAGE ====================
FROM node:22-alpine
WORKDIR /app

# Copia apenas o necessário
COPY --from=builder /app/dist/frontend-web ./dist/frontend-web

EXPOSE 4000

# Não precisa de npm ci aqui (SSR puro)
CMD ["node", "dist/frontend-web/server/server.mjs"]
