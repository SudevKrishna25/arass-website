/**
 * ARASS EVENTS — SSRF & URL Security Guard
 * Prevents requests/referrals to private IP ranges, localhost, and AWS/Cloud metadata endpoints.
 */

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
  '169.254.169.254', // AWS metadata endpoint
  'metadata.google.internal',
  '100.100.100.200', // Alibaba metadata
]);

export function validateSafeUrl(urlString: string): { valid: boolean; error?: string; url?: URL } {
  try {
    const url = new URL(urlString);

    // 1. Only HTTP and HTTPS
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return { valid: false, error: `Invalid protocol '${url.protocol}'. Only http: and https: are permitted.` };
    }

    const host = url.hostname.toLowerCase();

    // 2. Exact match on blocked hostnames
    if (BLOCKED_HOSTNAMES.has(host)) {
      return { valid: false, error: `Access to internal host '${host}' is blocked for security.` };
    }

    // 3. Match private IPv4 ranges (10.x.x.x, 172.16-31.x.x, 192.168.x.x, 127.x.x.x, 169.254.x.x)
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = host.match(ipv4Regex);
    if (match) {
      const [_, o1, o2] = match.map(Number);
      if (
        o1 === 10 ||
        o1 === 127 ||
        (o1 === 172 && o2 >= 16 && o2 <= 31) ||
        (o1 === 192 && o2 === 168) ||
        (o1 === 169 && o2 === 254) ||
        o1 === 0
      ) {
        return { valid: false, error: `Access to private IP range '${host}' is prohibited.` };
      }
    }

    return { valid: true, url };
  } catch (err: any) {
    return { valid: false, error: 'Invalid URL format.' };
  }
}
