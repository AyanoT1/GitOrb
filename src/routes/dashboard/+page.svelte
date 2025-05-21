<script>
	import Navbar from '$lib/components/Navbar.svelte';

	export let data;
</script>

<Navbar user={data.user}></Navbar>

<h2 class="mb-2 text-lg font-semibold">Repositories</h2>


<ul class="space-y-2">
	{#each data.repos as repo}
		<li>
			<a href={repo.html_url} target="_blank" class="text-blue-500 underline">
				{repo.full_name}
			</a>
		</li>
	{/each}
</ul>
