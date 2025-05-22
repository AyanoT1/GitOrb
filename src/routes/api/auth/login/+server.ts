import { redirect, type RequestHandler } from '@sveltejs/kit';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { GITHUB_CLIENT_ID } from '$env/static/private';
import { randomUUID } from 'crypto';

export const GET: RequestHandler = async ({ cookies, url }) => {
	const state = randomUUID();
	cookies.set('oauth_state', state, {
		path: '/',
		httpOnly: true,
		maxAge: 300,
		sameSite: 'lax',
		secure: true
	});

	const includePrivate = url.searchParams.get('private') === 'true';

	const redirect_uri = `${PUBLIC_BASE_URL}/api/auth/callback`;
	const scope = includePrivate ? 'read:user repo' : 'read:user public_repo';

	const params = new URLSearchParams({
		client_id: GITHUB_CLIENT_ID,
		scope,
		redirect_uri,
		prompt: 'consent',
		state
	});

	throw redirect(302, `https://github.com/login/oauth/authorize?${params.toString()}`);
};
