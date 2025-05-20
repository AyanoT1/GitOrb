<script>
	export let data;
</script>

<h2 class="text-lg font-semibold mb-2">Repositories</h2>

<ul class="space-y-2">
	{#each data.repos as repo}
		<li>
			<a href={repo.html_url} target="_blank" class="underline text-blue-500">
				{repo.full_name}
			</a>
		</li>
	{/each}
</ul>
