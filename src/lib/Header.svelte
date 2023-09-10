<script lang="ts">
  import { search, total } from './tabs';
</script>

<header
  class="sticky top-0 z-50 w-screen flex flex-col content-center drp-shadow-sm bg-white dark:bg-neutral-800 dark:text-white"
>
  <h2 class="m-3 text-2xl font-semibold">Tabitat</h2>

  <input
    type="search"
    placeholder="Search"
    bind:value={$search}
    class="mx-4 mb-4 p-1 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-2 focus:border-indigo-400 focus:ring-indigo-200 dark:bg-neutral-800"
  />

  <p class="self-center mb-1 text-base">Total Tabs: {$total}</p>
</header>

<style></style>
