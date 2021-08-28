<template>
  <nav class="panel is-primary">
    <p class="panel-heading">
      Tabitat
      <!-- <button class="button is-small" @click="showTabData">Tab Data</button> -->
    </p>

    <div class="panel-block">
      <p class="control has-icons-left">
        <input
          ref="searchBox"
          v-model="searchString"
          class="input"
          type="text"
          placeholder="Search"
        />
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span>
      </p>
    </div>
    <!-- <p class="panel-tabs">
      <a class="is-active">All</a>
      <a>This Window</a>
      <a>Other Windows</a>
    </p> -->
    <div id="tabs">
      <a v-for="tab in allTabsFiltered" :key="tab.id" class="panel-block is-active">
        <div class="panel-icon" @click="activateTab(tab.windowId, tab.index)">
          <figure class="image is-24x24">
            <img :src="tab.favIconUrl" />
          </figure>
        </div>
        <div class="pl-2" @click="activateTab(tab.windowId, tab.index)">
          <div class="truncate-tab">
            {{ tab.title }}
          </div>
          <div class="is-size-7 is-italic truncate-tab">
            {{ tab.url }}
          </div>
        </div>

        <div>
          <button class="delete" @click="closeTab(tab.id)"></button>
        </div>
      </a>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p><strong>Total Tabs:</strong> {{ totalTabs }}</p>
      </div>
    </footer>
  </nav>
</template>

<script>
import * as browser from 'webextension-polyfill';

export default {
  data() {
    return {
      currentWindowId: 0,
      currentWindowTabs: [],
      otherWindowsTabs: [],
      searchString: '',
    };
  },
  created() {
    // get all tabs and put them in data
    this.refreshTabData();
  },

  mounted() {
    this.$refs.searchBox.focus();
  },

  methods: {
    activateTab: function (windowId, tabIndex) {
      browser.tabs
        .highlight({
          windowId: windowId,
          tabs: [tabIndex],
        })
        .then(() => {
          browser.windows.update(windowId, { focused: true });
        });
    },

    closeTab: function (tabId) {
      browser.tabs.remove(tabId).then((result) => {
        this.refreshTabData();
      });
    },

    refreshTabData: function () {
      browser.tabs
        .query({ windowType: 'normal', currentWindow: true })
        .then((results) => {
          this.currentWindowTabs = results;
        });

      browser.tabs
        .query({ windowType: 'normal', currentWindow: false })
        .then((results) => {
          this.otherWindowsTabs = results;
        });
    },

    showTabData: function () {
      alert(JSON.stringify(this.currentWindowTabs));
    },
  },
  computed: {
    currentWindowTabsFiltered: function () {
      if (this.searchString.length === 0) {
        return this.currentWindowTabs;
      } else {
        return this.currentWindowTabs.filter((tab) => {
          let search = this.searchString.toLowerCase();
          let titleFound = tab.title.toLowerCase().includes(search) ? true : false;
          let urlFound = tab.url.toLowerCase().includes(search) ? true : false;

          if (titleFound || urlFound) {
            return true;
          } else {
            return false;
          }
        });
      }
    },

    otherWindowsTabsFiltered: function () {
      if (this.searchString.length === 0) {
        return this.otherWindowsTabs;
      } else {
        return this.otherWindowsTabs.filter((tab) => {
          let search = this.searchString.toLowerCase();
          let titleFound = tab.title.toLowerCase().includes(search) ? true : false;
          let urlFound = tab.url.toLowerCase().includes(search) ? true : false;

          if (titleFound || urlFound) {
            return true;
          } else {
            return false;
          }
        });
      }
    },

    allTabsFiltered: function () {
      let allTabs = this.currentWindowTabs.concat(this.otherWindowsTabs);

      if (this.searchString.length === 0) {
        return allTabs;
      } else {
        return allTabs.filter((tab) => {
          let search = this.searchString.toLowerCase();
          let titleFound = tab.title.toLowerCase().includes(search) ? true : false;
          let urlFound = tab.url.toLowerCase().includes(search) ? true : false;

          if (titleFound || urlFound) {
            return true;
          } else {
            return false;
          }
        });
      }
    },

    totalTabs: function () {
      return this.currentWindowTabs.length + this.otherWindowsTabs.length;
    },
  },
};
</script>

<style lang="scss">
@use '../assets/main.scss';

#app {
  width: 400px;
  height: 600px;
}

#tabs {
  height: 454px;
  overflow-y: auto;
}

.truncate-tab {
  width: 325px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
