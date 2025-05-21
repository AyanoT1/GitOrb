<script lang="ts">
	import { formatDate } from '$lib/utils';

	interface IssueOrPR {
		id: number;
		title: string;
		html_url: string;
		created_at: string;
		user: {
			login: string;
			avatar_url: string;
			html_url: string;
		};
		pull_request?: object;
	}

	interface Props {
		issues: IssueOrPR[];
	}

	let { issues }: Props = $props();

	let sorted = issues.toSorted(
		(a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	);

	const isPR = (item: IssueOrPR) => 'pull_request' in item;
</script>

<section class="card bg-base-100 col-span-3 rounded-xl p-4 shadow-md">
	<h2 class="mb-4 px-2 text-xl font-semibold">Issues and PR's</h2>
	<div id="pr-and-issues" class="flex flex-col gap-3">
		{#each sorted as item}
			<a
				href={item.html_url}
				target="_blank"
				class="card bg-base-200 hover:bg-base-300 p-3 shadow-sm transition-colors"
			>
				<div class="flex items-center gap-4">
					{#if isPR(item)}
						<svg
							class="text-success h-6 w-6"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M16 3v12a4 4 0 11-4-4H8a4 4 0 11-4-4h12z"></path>
						</svg>
					{:else}
						<svg
							class="text-error h-6 w-6"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="12" cy="12" r="10"></circle>
							<circle cx="12" cy="12" r="1.5" fill="currentColor"></circle>
						</svg>
					{/if}

					<div>
						<h2 class="card-title text-base {isPR(item) ? 'text-success' : 'text-error'}">
							{item.title}
						</h2>
						<p class="text-base-content/70 text-xs">
							Opened by @{item.user.login} · {formatDate(item.created_at)}
						</p>
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>
