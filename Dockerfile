# ============================================================
# THR Review — Multi-stage Docker build
# Stage 1: Install deps + build SPA with bun
# Stage 2: Serve with nginx
# ============================================================

# --- Stage 1: Build ---
FROM oven/bun:1 AS builder

WORKDIR /app

# Install dependencies first (cache layer)
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Copy source
COPY . .

# Build args baked into the SPA at build time
ARG VITE_CONVEX_URL
ARG VITE_CLERK_PUBLISHABLE_KEY

ENV VITE_CONVEX_URL=${VITE_CONVEX_URL}
ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}

RUN bun run build

# --- Stage 2: Serve ---
FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built SPA from builder
COPY --from=builder /app/dist/client /usr/share/nginx/html

EXPOSE 4330

CMD ["nginx", "-g", "daemon off;"]
