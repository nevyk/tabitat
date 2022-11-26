<template>
  <!-- container -->
  <div class="border-b border-neutral-200 dark:border-neutral-700">
    <div id="item-container" class="flex ml-2 mr-4 mt-2 mb-2">
      <!-- favicon block-->
      <div id="favicon-container" class="flex-none self-center mr-2">
        <img id="favicon" class="h-10 w-10" :src="faviconSrc" alt="" />
      </div>

      <!-- title and url block -->
      <div id="tab-container" class="grow truncate" @click="handleSwitch()">
        <p
          id="tab-title"
          class="text-base text-ellipsis overflow-hidden text-gray-900 dark:text-white">
          {{ props.tab.title }}
        </p>
        <div
          id="tab-url"
          class="text-ellipsis overflow-hidden text-sm text-gray-500 dark:text-neutral-400">
          <em>{{ props.tab.url }}</em>
        </div>
      </div>

      <!-- controls -->
      <div id="controls-container" class="self-center ml-2">
        <button id="close-button" type="button" @click.stop="handleClose()">
          <font-awesome-icon
            class="text-red-400 text-xl"
            icon="fa-regular fa-circle-xmark" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTabs } from '../composables/tabs';
const props = defineProps({
  tab: {
    type: Object,
    required: true
  }
});

// init tabs
const tabs = useTabs();

console.log(props.tab);

// handle favicon
const faviconSrc = getFaviconSrc(props.tab.url);
function getFaviconSrc(url) {
  let domain = '';

  if (url.indexOf('://') > -1) {
    // check to see if url starts with a protocol
    domain = url.split('/')[2];
  } else if (url.indexOf('//') === 0) {
    // check if url starts with '//''
    domain = url.split('/')[2];
  } else {
    // default to splitting by '/'
    domain = url.split('/')[0];
  }

  return `https://icon.horse/icon/${domain}`;
}

// controls
function handleSwitch() {
  tabs.switchTo(props.tab);
}

async function handleClose() {
  await tabs.close(props.tab);
}
</script>

<style lang="css" scoped></style>
