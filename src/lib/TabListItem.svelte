<script lang="ts">
  import { close, switchTo, getFavicon } from './tabs';

  export let url: string;
  export let title: string;
  export let tabIndex: number;
  export let tabId: number;
  export let windowId: number;

  let src = getFavicon(url);

  function handleSwitch() {
    switchTo(windowId, tabIndex);
  }

  function handleClose() {
    close(tabId);
  }
</script>

<div
  class="border-b border-b-neutral-200 border-t border-t-transparent hover:bg-indigo-400/10 dark:border-neutral-700 dark:hover:bg-indigo-200/5">
  <div id="item-container" class="flex ml-2 mr-4 mt-2 mb-2">
    <div id="favicon-container" class="flex-none self-center place-items-stretch mr-2">
      <img id="favicon" class="h-10 w-10" {src} alt="Favicon" />
    </div>

    <div id="tab-container" class="grow truncate" on:click|stopPropagation={handleSwitch}>
      <p
        id="tab-title"
        class="text-base text-ellipsis overflow-hidden text-gray-900 dark:text-white">
        {title}
      </p>
      <div
        id="tab-url"
        class="text-ellipsis overflow-hidden text-sm text-gray-500 dark:text-neutral-400">
        <em>{url}</em>
      </div>
    </div>

    <!-- controls -->
    <div id="controls-container" class="self-center ml-2">
      <button id="close-button" type="button" on:click|stopPropagation={handleClose}>
        <svg  xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
          <path class="fill-red-400" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/>
        </svg>
      </button>
    </div>
  </div>
</div>

<style></style>
