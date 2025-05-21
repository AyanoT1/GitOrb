<script lang="ts">
	import { onMount } from 'svelte';

	// List of available themes
	const themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter',
		'dim',
		'nord',
		'sunset',
		'caramellatte',
		'abyss',
		'silk'
	] as const;

	type Theme = (typeof themes)[number];

	// Initialize theme from localStorage or use default
	let currentTheme: Theme = 'light';

	onMount(() => {
		// Check for saved theme in localStorage
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		if (savedTheme && themes.includes(savedTheme)) {
			currentTheme = savedTheme;
		} else {
			// Check for system preference
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			currentTheme = prefersDark ? 'dark' : 'light';
		}

		// Apply the theme
		applyTheme(currentTheme);

		// Add click handlers for all theme buttons
		document.querySelectorAll('[data-set-theme]').forEach((button) => {
			button.addEventListener('click', (e) => {
				const target = e.currentTarget as HTMLElement;
				const theme = target.getAttribute('data-set-theme') as Theme;
				if (theme) {
					applyTheme(theme);
				}
			});
		});
	});

	function applyTheme(theme: Theme): void {
		// Set the theme on the HTML element
		document.documentElement.setAttribute('data-theme', theme);
		// Save to localStorage
		localStorage.setItem('theme', theme);
		// Update currentTheme
		currentTheme = theme;

		// Update the checkmark visibility
		document.querySelectorAll('[data-set-theme]').forEach((button) => {
			const svg = button.querySelector('svg');
			if (button.getAttribute('data-set-theme') === theme) {
				svg?.classList.remove('invisible');
			} else {
				svg?.classList.add('invisible');
			}
		});
	}
</script>

<div title="Change Theme" class="dropdown dropdown-end block">
	<div
		tabindex="0"
		role="button"
		class="btn group btn-sm btn-ghost gap-1.5 px-1.5"
		aria-label="Change Theme"
	>
		<div
			class="bg-base-100 group-hover:border-base-content/20 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1 transition-colors"
		>
			<div class="bg-base-content size-1 rounded-full"></div>
			<div class="bg-primary size-1 rounded-full"></div>
			<div class="bg-secondary size-1 rounded-full"></div>
			<div class="bg-accent size-1 rounded-full"></div>
		</div>
		<svg
			width="12px"
			height="12px"
			class="mt-px hidden size-2 fill-current opacity-60 sm:inline-block"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 2048 2048"
			><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg
		>
	</div>
	<div
		class="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 h-[30.5rem] max-h-[calc(100vh-8.6rem)] overflow-y-auto border border-white/5 shadow-2xl outline-1 outline-black/5"
	>
		<ul class="menu w-56">
			<li class="menu-title text-xs">Theme</li>
			{#each themes as theme}
				<li>
					<button class="gap-3 px-2" data-set-theme={theme} data-act-class="[&_svg]:visible">
						<div
							data-theme={theme}
							class="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm"
						>
							<div class="bg-base-content size-1 rounded-full"></div>
							<div class="bg-primary size-1 rounded-full"></div>
							<div class="bg-secondary size-1 rounded-full"></div>
							<div class="bg-accent size-1 rounded-full"></div>
						</div>
						<div class="w-32 truncate">{theme}</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="invisible h-3 w-3 shrink-0"
							><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
							></path></svg
						>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
