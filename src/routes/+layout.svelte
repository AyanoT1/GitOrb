<script>
	import { page } from '$app/stores';
	import '../app.css';

	let { children } = $props();
	let showRateLimitAlert = $state(false);

	$effect(() => {
		if ($page.url.searchParams.has('rate_limit_exceeded')) {
			showRateLimitAlert = true;

			const timer = setTimeout(() => {
				showRateLimitAlert = false;
			}, 10000);

			return () => clearTimeout(timer);
		}
	});
</script>

{#if showRateLimitAlert}
	<div class="alert alert-error mb-4 flex flex-col items-center text-center">
		<h1 class="text-3xl font-bold mb-2">Look at what you have done...</h1>
		<img
			src="https://i.pinimg.com/736x/b0/33/5c/b0335c4ba46fee29e39e56cb0a581c26.jpg"
			alt="Explosion"
			class="max-w-xs rounded shadow mb-2"
		/>
		<p class="text-lg">Loot at you, all clueless, after you exploded the GitHub Servers. Disgusting…</p>
	</div>
{/if}

{@render children()}
