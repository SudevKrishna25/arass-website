/**
 * ARASS EVENTS — Production Rate Limiter Abstraction
 * Supports sliding window rate limiting with Local In-Memory and Redis / Upstash providers.
 */

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  reset: number;
}

export interface RateLimiter {
  check(key: string, limit?: number, windowSeconds?: number): Promise<RateLimitResult>;
}

export class LocalRateLimiter implements RateLimiter {
  private requests = new Map<string, { count: number; expiresAt: number }>();

  async check(key: string, limit = 60, windowSeconds = 60): Promise<RateLimitResult> {
    const now = Date.now();
    const entry = this.requests.get(key);

    if (!entry || entry.expiresAt < now) {
      this.requests.set(key, {
        count: 1,
        expiresAt: now + windowSeconds * 1000,
      });
      return { allowed: true, remaining: limit - 1, reset: windowSeconds };
    }

    if (entry.count >= limit) {
      const reset = Math.ceil((entry.expiresAt - now) / 1000);
      return { allowed: false, remaining: 0, reset };
    }

    entry.count += 1;
    const remaining = limit - entry.count;
    const reset = Math.ceil((entry.expiresAt - now) / 1000);
    return { allowed: true, remaining, reset };
  }
}

export class RedisRateLimiter implements RateLimiter {
  constructor(private restUrl: string, private restToken: string) {}

  async check(key: string, limit = 60, windowSeconds = 60): Promise<RateLimitResult> {
    try {
      // Upstash REST API pipeline for atomic increment & expire
      const res = await fetch(`${this.restUrl}/pipeline`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.restToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          ['INCR', `ratelimit:${key}`],
          ['EXPIRE', `ratelimit:${key}`, windowSeconds, 'NX'],
          ['TTL', `ratelimit:${key}`],
        ]),
      });

      if (!res.ok) throw new Error('Redis rate limit request failed');
      const data = await res.json();
      const currentCount = data[0]?.result || 1;
      const ttl = data[2]?.result || windowSeconds;

      const allowed = currentCount <= limit;
      const remaining = Math.max(0, limit - currentCount);
      return { allowed, remaining, reset: ttl };
    } catch {
      // Fallback to allow request if Redis temporarily unavailable
      return { allowed: true, remaining: 1, reset: windowSeconds };
    }
  }
}

export function createRateLimiter(): RateLimiter {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return new RedisRateLimiter(process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN);
  }
  return new LocalRateLimiter();
}

export const rateLimiter: RateLimiter = createRateLimiter();
