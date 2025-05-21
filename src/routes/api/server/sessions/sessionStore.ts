type SessionData = {
	accessToken: string;
	expires: number;
};

const sessions = new Map<string, SessionData>();

export const sessionStore = {
	get(sessionId: string): SessionData | undefined {
		const session = sessions.get(sessionId);
		if (!session) return;

		if (session.expires < Date.now()) {
			sessions.delete(sessionId);
			return;
		}

		return session;
	},

	set(sessionId: string, data: SessionData) {
		sessions.set(sessionId, data);
	},

	delete(sessionId: string) {
		sessions.delete(sessionId);
	}
};
