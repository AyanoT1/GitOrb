import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const token = cookies.get('github_token');
	if (!token) throw redirect(302, '/api/auth/login');

	const res = await fetch('https://api.github.com/user/repos', {
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/vnd.github+json'
		}
	});

	if (!res.ok) {
		console.error('GitHub API error', res.status);
		throw new Error('Failed to load repositories');
	}

	const repos = await res.json();
	return { repos };
}
