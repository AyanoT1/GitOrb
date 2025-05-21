<script lang="ts">
	import { formatDate } from '$lib/utils';

	interface Repo {
		name: string;
		owner: {
			login: string;
			avatar_url: string;
		};
		html_url: string;
		description: string | undefined;
		updated_at: string;
		private: boolean;
	}

	interface Props {
		repos: Repo[];
	}

	let { repos }: Props = $props();

	let sortedRepos = repos.toSorted(
		(a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
	);
</script>

<section class="card bg-base-100 col-span-4 rounded-xl p-4 shadow-md">
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

					<main class="flex w-full items-center justify-between gap-4">
						<section class="min-w-0 flex-1 overflow-hidden">
							<h2 class="truncate text-lg font-bold">{repo.name}</h2>
							<p class="text-sm text-gray-500">by {repo.owner.login}</p>
							{#if repo.description}
								<p class="text-base-content/60 mt-1 text-xs">
									{repo.description}
								</p>
							{/if}
						</section>

						<section
							class="flex shrink-0 flex-col items-end gap-1 text-right whitespace-nowrap text-gray-500"
						>
							{#if repo.private}
								<div class="flex items-center gap-1 text-xs">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="h-4 w-4"
									>
										<circle cx="12" cy="16" r="1" />
										<rect x="3" y="10" width="18" height="12" rx="2" />
										<path d="M7 10V7a5 5 0 0 1 10 0v3" />
									</svg>
									<span>Private</span>
								</div>
							{/if}
							<p class="text-sm">Last updated:</p>
							<p class="text-xs">{formatDate(repo.updated_at)}</p>
						</section>
					</main>
				</div>
			</a>
		{/each}
	</div>
</section>
