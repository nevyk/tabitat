<template>
  <div id="main-container" class="container w-[475px] h-[600px]">
    <div class="sticky top-0 z-50">
      <TheHeader
        id="header"
        v-model="searchString"
        :total-tabs="tabs.tabList.length" />
    </div>

    <TabListItem
      v-for="tab of searchResults"
      :key="tab.index"
      :tab="tab"
      :fav-icon-url="tab.favIconUrl" />
  </div>
</template>

<script setup>
import * as browser from 'webextension-polyfill';
import TheHeader from './components/TheHeader.vue';
import TabListItem from './components/TabListItem.vue';
import { useTabs } from './composables/tabs';
import { computed, ref, onMounted, onUnmounted } from 'vue';

// load tabs
const tabs = useTabs();
tabs.refreshTabList();

// search
const searchString = ref('');
const searchResults = computed(() => {
  if (searchString.value.length < 1) {
    return tabs.tabList;
  } else {
    return tabs.tabList.filter((tab) => {
      let search = searchString.value.toLowerCase();
      let titleFound = tab.title.toLowerCase().includes(search) ? true : false;
      let urlFound = tab.url.toLowerCase().includes(search) ? true : false;

      return titleFound || urlFound ? true : false;
    });
  }
});

onMounted(() => {
  browser.tabs.onCreated.addListener(tabs.refreshTabList);
});

onUnmounted(() => {
  browser.tabs.onCreated.removeListener(tabs.refreshTabList);
});
</script>

<style lang="css"></style>
