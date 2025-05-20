import { json, redirect, type RequestEvent } from '@sveltejs/kit';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';


export async function GET({ url, fetch, cookies }: RequestEvent) {
	const code = url.searchParams.get('code');
	if (!code) return json({ error: 'Missing code' }, { status: 400 });

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

	if (data.error) return json({ error: data.error_description }, { status: 400 });

	cookies.set('github_token', data.access_token, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 7
	});

	throw redirect(302, '/dashboard');
}
