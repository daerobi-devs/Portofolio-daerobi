# ╔══════════════════════════════════════════════════════╗
# ║  Daerobi Portfolio — Dockerfile for Coolify Deploy   ║
# ║  Multi-stage build: deps → builder → runner          ║
# ╚══════════════════════════════════════════════════════╝

# ── Stage 1: Install deps ──────────────────────────────
FROM node:20-alpine AS deps
# Pasang libc6-compat dengan retry loop & toleransi transient DNS di VPS
RUN (for i in 1 2 3; do apk add --no-cache libc6-compat && break || sleep 2; done) || true
WORKDIR /app

COPY package.json package-lock.json* ./
# Konfigurasi retry network agar kebal terhadap socket drop / ECONNRESET di VPS
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && (npm ci --no-audit || npm install --no-audit)


# ── Stage 2: Build ────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ── Stage 3: Production runner (minimal image) ─────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Dedicated non-root user (security best practice)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Next.js standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
