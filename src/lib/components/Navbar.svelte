<script>
	import ThemeSelector from './ThemeSelector.svelte';

	let { user } = $props();
</script>

<nav class="navbar bg-base-100 flex justify-between p-4 shadow-sm">
	<h1 class="btn btn-ghost text-3xl font-bold">GitOrb</h1>
	<div class="me-2 flex items-center gap-4">
		<ThemeSelector />
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="rounded-field avatar avatar-online">
				<div class="w-12 cursor-pointer rounded-full">
					<img src={user.avatar_url} alt="pfp" />
				</div>
			</div>
			<ul class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
				<li>Item 1</li>
			</ul>
		</div>
	</div>
</nav>
