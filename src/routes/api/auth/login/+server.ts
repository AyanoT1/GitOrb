import { redirect } from '@sveltejs/kit';
import { GITHUB_CLIENT_ID } from '$env/static/private';

export function GET() {
	const params = new URLSearchParams({
		client_id: GITHUB_CLIENT_ID,
		scope: 'read:user repo',
		redirect_uri: 'http://localhost:5173/api/auth/callback',
		prompt: 'consent'
	});

	throw redirect(302, `https://github.com/login/oauth/authorize?${params.toString()}`);
}
