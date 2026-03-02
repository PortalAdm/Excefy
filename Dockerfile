FROM node:20-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* yarn.lock* ./
RUN yarn

COPY . .

# --- INÍCIO DA ALTERAÇÃO ---
# Recebe a URL como argumento de build e a define como variável de ambiente para o Next.js
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
# --- FIM DA ALTERAÇÃO ---

RUN yarn build

FROM base AS production
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_SHARP_PATH "/app/node_modules/sharp"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=deps /app/next.config.js ./
COPY --from=deps --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=deps --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Standalone output
CMD ["node", "server.js"]
