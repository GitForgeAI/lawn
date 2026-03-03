# ============================================================
# THR Review — nginx SPA container
# Expects pre-built dist/client/ from CI build step
# ============================================================

FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy pre-built SPA assets (built in CI, not in Docker)
COPY dist/client /usr/share/nginx/html

EXPOSE 4330

CMD ["nginx", "-g", "daemon off;"]
