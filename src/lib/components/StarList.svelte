<script lang="ts">
	import { formatDate } from '$lib/utils';

	interface Star {
		name: string;
		owner: { login: string; avatar_url: string; url: 'string' };
		description: string | undefined;
		html_url: string;
		updated_at: string;
	}

	interface Props {
		stars: Star[];
	}

	let { stars }: Props = $props();
</script>

<section class="card bg-base-100 col-span-3 rounded-xl p-4 shadow-md">
	<h2 class="mb-4 px-2 text-xl font-semibold">Stars ⭐</h2>

	<div id="stars" class="flex flex-col gap-3">
		{#each stars as star}
			<a
				href={star.html_url}
				target="_blank"
				class="card bg-base-200 hover:bg-base-300 p-3 shadow-sm transition-colors"
			>
				<div class="flex items-center gap-3">
					<div class="avatar">
						<div class="w-10 rounded-full">
							<img src={star.owner.avatar_url} alt={`${star.owner.login}'s avatar`} />
						</div>
					</div>

					<main class="flex w-full items-center justify-between">
						<section>
							<h2 class="text-lg font-bold">{star.name}</h2>
							<p class="text-sm text-gray-500">by {star.owner.login}</p>
							{#if star.description}
								<p class="text-base-content/60 col-span-2 mt-1 text-xs">
									{star.description}
								</p>
							{/if}
						</section>
					</main>
				</div>
			</a>
		{/each}
	</div>
</section>
