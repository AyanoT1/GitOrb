import { redirect } from '@sveltejs/kit';
import { sessionStore } from '../../server/sessions/sessionStore';

export function POST({ cookies }) {
    const sessionId = cookies.get('session_id');
    if (sessionId) {
        sessionStore.delete(sessionId);
        cookies.delete('session_id', { path: '/' });
    }
    cookies.delete('github_token', { path: '/' });
    throw redirect(302, '/');
}
