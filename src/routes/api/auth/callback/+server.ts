import { redirect, type RequestEvent } from '@sveltejs/kit';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { randomUUID } from 'crypto';
import { sessionStore } from '../../server/sessions/sessionStore';

export async function GET({ url, fetch, cookies }: RequestEvent) {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const storedState = cookies.get('oauth_state');
	cookies.delete('oauth_state', { path: '/' });

	if (!code || !state || state !== storedState) {
		throw redirect(302, '/error?message=Invalid+or+missing+CSRF+token');
	}
	if (!code) throw redirect(302, '/error?message=Missing+OAuth+code');

	const res = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			client_id: GITHUB_CLIENT_ID,
			client_secret: GITHUB_CLIENT_SECRET,
			code
		})
	});

	const data = await res.json();
	if (data.error) throw redirect(302, `/error?message=${data.error_description}`);

	const sessionId = randomUUID();

	sessionStore.set(sessionId, {
		accessToken: data.access_token,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7
	});

	cookies.set('session_id', sessionId, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 7,
		sameSite: 'lax',
		secure: true
	});

	throw redirect(302, '/dashboard');
}
