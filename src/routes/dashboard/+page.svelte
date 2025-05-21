<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import RepositoryList from '$lib/components/RepositoryList.svelte';
	import StarList from '$lib/components/StarList.svelte';

	export let data;
</script>

<Navbar user={data.user} />

<main class="mt-10 flex flex-row gap-6 px-6">
	<section class="card bg-base-100 flex-1 rounded-xl p-4 shadow-md">
		<h2 class="mb-4 px-2 text-xl font-semibold">Issues and PR's</h2>
		<div class="text-base-content/50 py-10 text-center">
			Issues and pull requests will appear here
		</div>
	</section>

	<RepositoryList repos={data.repos} />

	<StarList stars={data.stars} />
</main>
