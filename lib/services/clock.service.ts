/**
 * ARASS EVENTS — Authoritative Server Clock & Synchronization Engine
 * Guarantees server-authoritative time for all competition deadlines,
 * preventing client-side clock tampering or artificial submission extensions.
 */

export interface ServerTimePayload {
  iso: string;
  epochMs: number;
  timezone: string;
}

export class ClockService {
  /**
   * Return current authoritative server time
   */
  static now(): ServerTimePayload {
    const d = new Date();
    return {
      iso: d.toISOString(),
      epochMs: d.getTime(),
      timezone: 'UTC',
    };
  }

  /**
   * Authoritative validation of whether a submission timestamp is within the allowable window
   */
  static isWithinDeadline(deadlineIso: string, gracePeriodMs = 30000): boolean {
    const serverNow = Date.now();
    const deadline = new Date(deadlineIso).getTime();
    return serverNow <= deadline + gracePeriodMs;
  }

  /**
   * Compute authoritative remaining seconds until deadline
   */
  static getRemainingSeconds(deadlineIso: string): number {
    const serverNow = Date.now();
    const deadline = new Date(deadlineIso).getTime();
    return Math.max(0, Math.floor((deadline - serverNow) / 1000));
  }

  /**
   * Check if round is active according to server time
   */
  static isRoundActive(startAtIso: string, endAtIso: string): boolean {
    const serverNow = Date.now();
    const start = new Date(startAtIso).getTime();
    const end = new Date(endAtIso).getTime();
    return serverNow >= start && serverNow <= end;
  }
}
