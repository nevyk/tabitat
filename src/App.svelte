<script lang="ts">
	import { onMount } from 'svelte';
	import { refresh, total } from './lib/tabs';
	import Header from './lib/Header.svelte';
	import TabList from './lib/TabList.svelte';

	onMount(() => {
		refresh();
	});
</script>

<main class="container w-[25rem]">
	<Header />
	<div class="h-[30rem] overflow-y-auto">
		<TabList />
	</div>
</main>

<style></style>
