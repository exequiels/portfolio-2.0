type RateLimitEntry = {
  lastRequestAt: number
}

const requestCounts = new Map<string, RateLimitEntry>()

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = requestCounts.get(ip)

  // First request
  if (!entry) {
    requestCounts.set(ip, { lastRequestAt: now })
    return true
  }

  // 30 seconds = 30000 ms
  if (now - entry.lastRequestAt < 30_000) {
    return false
  }

  // Allowed again → update timestamp
  requestCounts.set(ip, { lastRequestAt: now })
  return true
}
