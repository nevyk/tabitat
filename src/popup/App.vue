<template>
  <v-app>
    <v-app-bar app dense color="blue">
      <v-toolbar-title class="app-title">Tabitat</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-text-field
          autofocus
          dense
          outlined
          placeholder="Search"
          v-model="searchString"
        ></v-text-field>
        <v-row justify="center" dense>
          <v-col>
            <v-card class="card" elevation="2" outlined>
              <v-subheader>This Window</v-subheader>
              <v-list dense nav>
                <v-list-item-group>
                  <v-list-item
                    v-for="(tab, t) in currentWindowTabsFiltered"
                    v-bind:key="t"
                  >
                    <v-list-item-avatar size="24" tile>
                      <v-img v-bind:src="tab.favIconUrl"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content
                      v-on:click="activateTab(tab.windowId, tab.index)"
                    >
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
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center" dense>
          <v-col>
            <v-card class="card" elevation="2" outlined>
              <v-subheader>Other Windows</v-subheader>
              <v-list dense nav>
                <v-list-item-group>
                  <v-list-item
                    v-for="(tab, t) in otherWindowsTabsFiltered"
                    v-bind:key="t"
                  >
                    <v-list-item-avatar size="24" tile>
                      <v-img v-bind:src="tab.favIconUrl"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content
                      v-on:click="activateTab(tab.windowId, tab.index)"
                    >
                      <v-list-item-title v-text="tab.title"></v-list-item-title>
                      <v-list-item-subtitle v-html="tab.url"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn icon elevation="2" v-on:click="closeTab(tab.id)">
                        <v-icon>mdi-trash-can-outline</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      currentWindowId: 0,
      currentWindowTabs: [],
      otherWindowsTabs: [],
      searchString: ''
    };
  },
  created() {
    // get all tabs and put them in data
    this.refreshTabData();
    this.$vuetify.theme.dark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? true
        : false;
  },
  methods: {
    activateTab: function(windowId, tabIndex) {
      browser.tabs
        .highlight({
          windowId: windowId,
          tabs: [tabIndex]
        })
        .then(() => {
          browser.windows.update(windowId, { focused: true });
        });
    },
    closeTab: function(tabId, currentTabId) {
      browser.tabs.remove(tabId).then(result => {
        this.refreshTabData();
      });
    },
    refreshTabData: function() {
      browser.tabs.query({ windowType: 'normal', currentWindow: true }).then(results => {
        this.currentWindowTabs = results;
      });

      browser.tabs.query({ windowType: 'normal', currentWindow: false }).then(results => {
        this.otherWindowsTabs = results;
      });
    }
  },
  computed: {
    currentWindowTabsFiltered: function() {
      if (this.searchString.length === 0) {
        return this.currentWindowTabs;
      } else {
        let tabs = [];

        this.currentWindowTabs.forEach(tab => {
          let title = tab.title.toLowerCase();
          let search = this.searchString.toLowerCase();

          if (title.includes(search)) {
            tabs.push(tab);
          }
        });

        return tabs;
      }
    },
    otherWindowsTabsFiltered: function() {
      if (this.searchString.length === 0) {
        return this.otherWindowsTabs;
      } else {
        let tabs = [];

        this.otherWindowsTabs.forEach(tab => {
          let title = tab.title.toLowerCase();
          let search = this.searchString.toLowerCase();

          if (title.includes(search)) {
            tabs.push(tab);
          }
        });

        return tabs;
      }
    }
  }
};
</script>

<style scoped>
.app-title {
  color: white;
}
.card {
  width: 400px;
}
</style>
