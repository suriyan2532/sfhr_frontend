# Environment Configuration Guide

## Overview

This project uses environment-specific `.env` files to manage configuration:

- **`.env.development`** - Development environment (committed to git)
- **`.env.local`** - Local overrides (gitignored, for personal settings)
- **`.env.production`** - Production environment (gitignored)

## File Priority

Next.js loads environment files in this order (later files override earlier ones):

1. `.env.development` (when `NODE_ENV=development`)
2. `.env.production` (when `NODE_ENV=production`)
3. `.env.local` (always loaded, highest priority)

## Current Configuration

### Development (.env.development)
```bash
AUTH_SECRET="LXsFVoisWNUttTTFCw71F22ZhfyOQnS6H+rBCR3Qu38="
NEXT_PUBLIC_API_URL="http://localhost:8000"
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000/api"
NODE_ENV="development"
```

### Local Overrides (.env.local)
```bash
AUTH_SECRET="LXsFVoisWNUttTTFCw71F22ZhfyOQnS6H+rBCR3Qu38="
NEXT_PUBLIC_API_URL="http://localhost:8000"
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000/api"
NODE_ENV="development"
```

### Production (.env.production)
```bash
AUTH_SECRET="REPLACE_WITH_PRODUCTION_SECRET"
NEXT_PUBLIC_API_URL="https://api.yourdomain.com"
NEXT_PUBLIC_API_BASE_URL="https://api.yourdomain.com/api"
NODE_ENV="production"
```

## Environment Variables

### AUTH_SECRET
- Used by NextAuth for session encryption
- **IMPORTANT**: Generate a new secret for production!
- Generate with: `openssl rand -base64 32`

### NEXT_PUBLIC_API_URL
- Base URL for backend API
- Accessible in browser (prefixed with `NEXT_PUBLIC_`)
- Development: `http://localhost:8000`
- Production: Update with your production API URL

### NEXT_PUBLIC_API_BASE_URL
- Full API endpoint URL
- Development: `http://localhost:8000/api`
- Production: Update with your production API endpoint

### NODE_ENV
- Automatically set by Next.js
- Values: `development`, `production`, `test`

## Usage in Code

Environment variables are accessed via `process.env`:

```typescript
// API client example
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

// Auth configuration
const authSecret = process.env.AUTH_SECRET;
```

## Best Practices

1. **Never commit secrets** to git
2. **Use `.env.local`** for personal overrides
3. **Keep `.env.development`** with safe defaults
4. **Update `.env.production`** before deployment
5. **Prefix browser-accessible vars** with `NEXT_PUBLIC_`

## Migration Notes

- ❌ Removed `.env` file (was redundant)
- ❌ Removed `DATABASE_URL` (no longer using Prisma)
- ✅ Frontend now uses API client instead of direct database access
