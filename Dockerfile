# -----------------------------
# 1️⃣ Base Stage (Dependencies)
# -----------------------------
FROM node:18 AS base

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install


# -----------------------------
# 2️⃣ Production Stage
# -----------------------------
FROM node:18-alpine AS production

WORKDIR /app

# Copy installed node_modules from base stage
COPY --from=base /app/node_modules ./node_modules

# Copy full project
COPY . .

# Set environment variables (optional defaults)
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]