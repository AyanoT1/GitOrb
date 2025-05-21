<script>
	import ThemeSelector from './ThemeSelector.svelte';

	let { user } = $props();
</script>

<nav class="navbar bg-base-100 flex justify-between p-4 shadow-sm">
	<div class="flex items-center gap-5">
		<a
			href="https://github.com/AyanoT1/GitOrb"
			target="_blank"
			rel="noopener noreferrer"
			class="hover:text-primary ms-2 ml-auto flex items-center gap-2 transition-colors"
			aria-label="View source on GitHub"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 24 24"
				class="h-7 w-7"
			>
				<path
					d="M12 0C5.37 0 0 5.373 0 12a12.002 12.002 0 008.21 11.387c.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.334-1.756-1.334-1.756-1.09-.745.082-.73.082-.73 1.204.084 1.837 1.237 1.837 1.237 1.07 1.834 2.809 1.304 3.493.997.107-.775.42-1.304.762-1.603-2.665-.305-5.466-1.335-5.466-5.933 0-1.31.468-2.382 1.236-3.222-.124-.303-.535-1.527.117-3.183 0 0 1.008-.322 3.3 1.23a11.43 11.43 0 013.003-.403c1.02.005 2.047.137 3.003.403 2.29-1.552 3.295-1.23 3.295-1.23.654 1.656.243 2.88.12 3.183.77.84 1.235 1.913 1.235 3.222 0 4.61-2.805 5.625-5.476 5.922.431.372.815 1.105.815 2.228v3.303c0 .32.217.694.825.576A12.006 12.006 0 0024 12c0-6.627-5.373-12-12-12z"
				/>
			</svg>
		</a>
		<h1 class="text-3xl font-bold">GitOrb 🔮</h1>
	</div>
	<div class="me-2 flex items-center gap-4">
		<ThemeSelector />
		<div class="avatar avatar-online">
			<div class="w-10 cursor-pointer rounded-full">
				<a href={user.html_url} target="_blank">
					<img src={user.avatar_url} alt="pfp" />
				</a>
			</div>
		</div>
	</div>
</nav>
