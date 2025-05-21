import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const token = cookies.get('github_token');
	if (!token) throw redirect(302, '/api/auth/login');

	const headers = {
		Authorization: `Bearer ${token}`,
		Accept: 'application/vnd.github+json'
	};

	// Fetch user
	const userRes = await fetch('https://api.github.com/user', { headers });
	if (!userRes.ok) {
		console.error('GitHub user fetch error', userRes.status);
		throw new Error('Failed to fetch user');
	}
	const user = await userRes.json();

	// Fetch repos
	const reposRes = await fetch('https://api.github.com/user/repos', { headers });
	if (!reposRes.ok) {
		console.error('GitHub repos fetch error', reposRes.status);
		throw new Error('Failed to fetch repositories');
	}
	const repos = await reposRes.json();

	// Fetch stars
	const starredRes = await fetch('https://api.github.com/user/starred', { headers });
	if (!starredRes.ok) throw new Error('Failed to fetch starred repositories');
	const stars = await starredRes.json();
	
	return { user, repos, stars };
}
