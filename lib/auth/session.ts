/**
 * ARASS EVENTS — Secure Session Management
 */

import crypto from 'crypto';
import { UserRole } from '../events-db/types';

export interface SessionPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
  organizationId?: string;
  exp: number;
}

const AUTH_SECRET = process.env.AUTH_SECRET || 'arass-events-secure-default-secret-key-32-chars';

export function signToken(payload: Omit<SessionPayload, 'exp'>, expiresInSeconds = 86400 * 7): string {
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const data: SessionPayload = { ...payload, exp };
  const encodedData = Buffer.from(JSON.stringify(data)).toString('base64url');
  const signature = crypto.createHmac('sha256', AUTH_SECRET).update(encodedData).digest('base64url');
  return `${encodedData}.${signature}`;
}

export function verifyToken(token?: string | null): SessionPayload | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encodedData, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', AUTH_SECRET).update(encodedData).digest('base64url');

  if (signature !== expectedSignature) return null;

  try {
    const payload: SessionPayload = JSON.parse(Buffer.from(encodedData, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}
