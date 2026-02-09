import createMiddleware from 'next-intl/middleware';
import { auth } from "@/auth"; 
import { NextResponse } from 'next/server';
import { routing } from './navigation';

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
    // If authenticated or public path, run intl middleware
    // Auth logic is handled by auth() wrapper which populates req.auth
    
    // Check if protected route?
    // For now, let's just chain them.
    return intlMiddleware(req);
});

export const config = {
  // Skip all internal paths (_next)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
