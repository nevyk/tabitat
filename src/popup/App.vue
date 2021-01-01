<template>
  <v-app width="400" max-height="600">
    <v-app-bar app dense color="blue">
      <v-toolbar-title class="app-title">Tabitat</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-card>
        <v-list nav dense>
          <v-list-item
            v-for="tab in tabs"
            v-bind:key="tab.id"
            v-on:click="activateTab(tab.windowId, tab.index)"
          >
            <v-list-item-avatar size="20" tile>
              <v-img v-bind:src="tab.favIconUrl"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="tab.title"></v-list-item-title>
              <v-list-item-subtitle v-html="tab.url"></v-list-item-subtitle>
            </v-list-item-content>
            <v-icon v-if="tab.active">mdi-eye-outline</v-icon>
            <v-list-item-action>
              <v-btn icon elevation="2" v-on:click="closeTab(tab.id)">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      tabs: []
    }
  },
  created() {
    // get all tabs and put them in data
    this.refreshTabData()
  },
  methods: {
    activateTab: function(windowId, tabIndex) {
      browser.tabs
        .highlight({
          windowId: windowId,
          tabs: [tabIndex]
        })
        .then()
    },
    closeTab: function(tabId, currentTabId) {
      browser.tabs.remove(tabId).then(result => {
        this.refreshTabData()
      })
    },
    refreshTabData: function() {
      browser.tabs.query({}).then(results => {
        this.tabs = results
      })
    }
  }
}
</script>

<style scoped>
.app-title {
  color: white;
}
</style>
