<script lang="ts">
	export let repos: Array<{
		name: string;
		owner: {
			login: string;
			avatar_url: string;
		};
		html_url: string;
		description: string | null;
		updated_at: string;
	}>;

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	};

	$: sortedRepos = [...repos].sort(
		(a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
	);
</script>

<section class="card bg-base-100 flex-[1.5] rounded-xl p-4 shadow-md">
	<h1 class="mb-4 px-2 text-2xl font-semibold">Recent Repos</h1>
	<div id="repos" class="flex flex-col gap-3">
		{#each sortedRepos as repo}
			<a
				href={repo.html_url}
				target="_blank"
				class="card bg-base-200 hover:bg-base-300 p-3 shadow-sm transition-colors"
			>
				<div class="flex items-center gap-3">
					<div class="avatar">
						<div class="w-10 rounded-full">
							<img src={repo.owner.avatar_url} alt={`${repo.owner.login}'s avatar`} />
						</div>
					</div>

					<main class="flex w-full items-center justify-between">
						<section>
							<h2 class="text-lg font-bold">{repo.name}</h2>
							<p class="text-sm text-gray-500">by {repo.owner.login}</p>
							{#if repo.description}
								<p class="text-base-content/60 col-span-2 mt-1 text-xs">
									{repo.description}
								</p>
							{/if}
						</section>

						<section class="text-right">
							<p class="text-sm text-gray-500">Last updated:</p>
							<p class="text-xs text-gray-500">{formatDate(repo.updated_at)}</p>
						</section>
					</main>
				</div>
			</a>
		{/each}
	</div>
</section>
