type RateInfo = {
	count: number;
	firstRequestTimestamp: number;
};

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

const rateMap = new Map<string, RateInfo>();

export function isRateLimited(sessionId: string): boolean {
	const now = Date.now();
	const info = rateMap.get(sessionId);

	if (!info) {
		rateMap.set(sessionId, { count: 1, firstRequestTimestamp: now });
		return false;
	}

	if (now - info.firstRequestTimestamp > RATE_LIMIT_WINDOW_MS) {
		rateMap.set(sessionId, { count: 1, firstRequestTimestamp: now });
		return false;
	}

	info.count++;
	rateMap.set(sessionId, info);

	return info.count > MAX_REQUESTS_PER_WINDOW;
}

export function clearRateLimit(sessionId: string) {
	rateMap.delete(sessionId);
}
