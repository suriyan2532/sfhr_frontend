# Environment Variables Configuration Guide

This project uses multiple environment files for different deployment scenarios.

## Environment Files

### 1. `.env` (Base Configuration)
- **Purpose**: Default configuration for all environments
- **Usage**: Loaded by default, contains shared settings
- **Committed**: ❌ Never commit this file (contains secrets)

### 2. `.env.development`
- **Purpose**: Development environment configuration
- **Usage**: Automatically loaded when running `npm run dev`
- **Backend API**: Points to `http://localhost:3001`
- **Committed**: ✅ Can be committed (no production secrets)

### 3. `.env.local`
- **Purpose**: Local overrides for personal development
- **Usage**: Overrides all other env files (highest priority)
- **Committed**: ❌ Never commit (personal settings)

### 4. `.env.production`
- **Purpose**: Production environment configuration
- **Usage**: Loaded when running `npm run build` and `npm start`
- **Backend API**: Update with production URL
- **Committed**: ⚠️ Template only (update secrets before deployment)

## Environment Variables

### Database Configuration
```bash
DATABASE_URL="postgresql://user:password@host:port/database"
```

### Authentication
```bash
AUTH_SECRET="your-secret-key-here"
```

### API Backend Configuration
```bash
# Backend server URL
NEXT_PUBLIC_API_URL="http://localhost:3001"

# Backend API base path
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001/api"
```

## Usage in Code

### Using Environment Variables
```typescript
// Access environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### Using API Configuration Helper
```typescript
import { API_ENDPOINTS, apiGet, apiPost } from '@/lib/api-config';

// Make API requests
const users = await apiGet(API_ENDPOINTS.users.list);
const newUser = await apiPost(API_ENDPOINTS.users.create, userData);
```

## Environment Priority

Next.js loads environment files in this order (highest to lowest priority):

1. `.env.local` (highest priority, always ignored by git)
2. `.env.development` or `.env.production` (depending on NODE_ENV)
3. `.env` (lowest priority)

## Backend Server Configuration

The backend server (`sfhr_backend`) runs on:
- **Development**: `http://localhost:3001`
- **Production**: Update `NEXT_PUBLIC_API_URL` in `.env.production`

Make sure the backend server is running before starting the frontend:
```bash
# In sfhr_backend directory
npm run dev
```

## Security Best Practices

1. **Never commit** `.env` or `.env.local` files
2. **Generate new secrets** for production (don't use development secrets)
3. **Use strong passwords** for database connections
4. **Rotate secrets regularly** in production
5. **Use environment-specific** database instances

## Deployment Checklist

Before deploying to production:

- [ ] Update `DATABASE_URL` with production database
- [ ] Generate new `AUTH_SECRET` for production
- [ ] Update `NEXT_PUBLIC_API_URL` with production backend URL
- [ ] Verify all environment variables are set correctly
- [ ] Test the connection to production backend
- [ ] Ensure `.env.local` is in `.gitignore`

## Troubleshooting

### Frontend can't connect to backend
1. Verify backend is running on the correct port
2. Check `NEXT_PUBLIC_API_URL` in your environment file
3. Ensure CORS is configured correctly in backend

### Environment variables not loading
1. Restart the development server after changing env files
2. Verify the file name is correct (`.env.development`, not `.env.dev`)
3. Check that variables start with `NEXT_PUBLIC_` for client-side access
