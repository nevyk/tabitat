<script lang="ts">
  import { onMount } from 'svelte';
  import { searchResults, refresh } from './lib/tabs';
  import Header from './lib/Header.svelte';
  import TabListItem from './lib/TabListItem.svelte';

  onMount(() => {
    refresh();
  });
</script>

<main class="container w-[475px] h-[600px]">
  <Header />

  {#each $searchResults as tab (tab.id)}
    <TabListItem windowId={tab.windowId} tabIndex={tab.index} tabId={tab.id} title={tab.title} url={tab.url} />
  {/each}
</main>

<style>
</style>
