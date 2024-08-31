<script lang="ts">
	import { search, total } from './tabs';
</script>

<header>
	<nav class="navbar">
		<h2 class="m-3 text-2xl font-semibold">Tabitat</h2>
		<input
			class="input input-bordered input-primary input-sm w-full max-w-sm"
			type="search"
			placeholder="Search {$total} Tabs"
			bind:value={$search}
			autofocus />
	</nav>
</header>

<style></style>
