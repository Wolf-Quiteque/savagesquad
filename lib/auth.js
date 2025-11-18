import { serialize, parse } from 'cookie';

const SESSION_NAME = 'admin_session';
const SESSION_SECRET = process.env.SESSION_SECRET || 'default_secret_change_this';

// Verify admin credentials
export function verifyCredentials(email, password) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  return email === adminEmail && password === adminPassword;
}

// Generate session token using Web Crypto API (works in Edge Runtime)
export function generateSessionToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Create session cookie
export function createSessionCookie(sessionToken) {
  return serialize(SESSION_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

// Get session from cookies
export function getSessionFromCookie(cookieHeader) {
  if (!cookieHeader) return null;

  const cookies = parse(cookieHeader);
  return cookies[SESSION_NAME] || null;
}

// Clear session cookie
export function clearSessionCookie() {
  return serialize(SESSION_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

// Verify session (you can optionally store sessions in MongoDB)
export async function verifySession(sessionToken) {
  if (!sessionToken) return false;

  // For simple implementation, just check if token exists
  // In production, you might want to store sessions in MongoDB
  return sessionToken.length === 64; // Valid token format
}

// Get admin email from env
export function getAdminEmail() {
  return process.env.ADMIN_EMAIL || 'admin@savagesquad.com';
}
