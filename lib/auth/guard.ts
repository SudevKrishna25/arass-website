/**
 * ARASS EVENTS — API Authorization Guards
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, SessionPayload } from './session';
import { hasPermission, hasAnyRole, Permission } from './rbac';
import { UserRole } from '../events-db/types';

export function getSession(req: NextRequest): SessionPayload | null {
  const authHeader = req.headers.get('authorization');
  let token: string | null = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else {
    token = req.cookies.get('arass_events_session')?.value || null;
  }

  return verifyToken(token);
}

export function requireAuth(req: NextRequest): { session: SessionPayload } | { errorResponse: NextResponse } {
  const session = getSession(req);
  if (!session) {
    return {
      errorResponse: NextResponse.json(
        { error: 'Unauthorized. Authentication session required.' },
        { status: 401 }
      ),
    };
  }
  return { session };
}

export function requirePermissionGuard(
  req: NextRequest,
  permission: Permission
): { session: SessionPayload } | { errorResponse: NextResponse } {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth;

  if (!hasPermission(auth.session.role, permission)) {
    return {
      errorResponse: NextResponse.json(
        { error: `Forbidden. Missing required permission: ${permission}` },
        { status: 403 }
      ),
    };
  }

  return auth;
}

export function requireRoleGuard(
  req: NextRequest,
  allowedRoles: UserRole[]
): { session: SessionPayload } | { errorResponse: NextResponse } {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth;

  if (!hasAnyRole(auth.session.role, allowedRoles)) {
    return {
      errorResponse: NextResponse.json(
        { error: `Forbidden. Role '${auth.session.role}' is not authorized.` },
        { status: 403 }
      ),
    };
  }

  return auth;
}

export function requireOrgIsolationGuard(
  session: SessionPayload,
  resourceOrgId?: string
): { authorized: boolean; errorResponse?: NextResponse } {
  if (session.role === 'SUPER_ADMIN') return { authorized: true };
  if (!resourceOrgId) return { authorized: true };
  if (session.organizationId && session.organizationId !== resourceOrgId) {
    return {
      authorized: false,
      errorResponse: NextResponse.json(
        { error: 'Forbidden. Cross-organization access is strictly prohibited.' },
        { status: 403 }
      ),
    };
  }
  return { authorized: true };
}
