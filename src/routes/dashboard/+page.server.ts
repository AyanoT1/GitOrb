import { redirect } from '@sveltejs/kit';
import { sessionStore } from '../api/server/sessions/sessionStore';

export async function load({ cookies, fetch }) {
	const sessionId = cookies.get('session_id');
	if (!sessionId) throw redirect(302, '/login');

	const session = sessionStore.get(sessionId);
	if (!session) throw redirect(302, '/login');

	const headers = {
		Authorization: `Bearer ${session.accessToken}`,
		Accept: 'application/vnd.github+json'
	};

	// Fetch user
	const userRes = await fetch('https://api.github.com/user', { headers });
	if (!userRes.ok) throw new Error('Failed to fetch user');
	const user = await userRes.json();

	// Fetch repos
	const reposRes = await fetch('https://api.github.com/user/repos', { headers });
	if (!reposRes.ok) throw new Error('Failed to fetch repositories');
	const repos = await reposRes.json();

	// Fetch stars
	const starredRes = await fetch('https://api.github.com/user/starred', { headers });
	if (!starredRes.ok) throw new Error('Failed to fetch starred repositories');
	const stars = await starredRes.json();

	// Fetch issues and PRs
	const issuesAndPRsRes = await fetch(
		`https://api.github.com/search/issues?q=is:open+involves:${user.login}`,
		{ headers }
	);
	if (!issuesAndPRsRes.ok) throw new Error('Failed to fetch issues and PRs');
	const issues = (await issuesAndPRsRes.json()).items;

	return { user, repos, stars, issues };
}
