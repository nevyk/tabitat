<script lang="ts">
	import { searchResults, close, switchTo } from './tabs';
</script>

<ul class="menu rounded-box">
	{#each $searchResults as tab (tab.id)}
		<li>
			<div class="flex w-96">
				<img class="inline-block size-8" src={tab.favIconUrl} alt="" />
				<a
					class="grow truncate"
					href={'#'}
					on:click={() => {
						if (tab.windowId && tab.id) {
							switchTo(tab.windowId, tab.id);
						}
					}}>
					<p class="truncate">{tab.title}</p>
					<p class="truncate">
						<em>{tab.url}</em>
					</p>
				</a>
				<button
					class="btn btn-error btn-outline btn-sm btn-square"
					on:click|stopPropagation={() => {
						if (tab.id) {
							close(tab.id);
						}
					}}>
					<svg
						class="size-5 feather feather-trash-2"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><polyline points="3 6 5 6 21 6"></polyline><path
							d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
						></path
						><line x1="10" y1="11" x2="10" y2="17"></line><line
							x1="14"
							y1="11"
							x2="14"
							y2="17"></line
						></svg>
				</button>
			</div>
		</li>
	{/each}
</ul>

<style></style>
