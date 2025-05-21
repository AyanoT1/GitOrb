<script lang="ts">
	import IssueList from '$lib/components/IssueList.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import RepositoryList from '$lib/components/RepositoryList.svelte';
	import StarList from '$lib/components/StarList.svelte';

	export let data;
</script>

<Navbar user={data.user} />

<main class="mt-10 grid grid-cols-10 gap-4 px-6">
	<IssueList issues={data.issues}/>

	<RepositoryList repos={data.repos} />

	<StarList stars={data.stars} />
</main>
