import * as browser from 'webextension-polyfill';
import { reactive } from 'vue';

const tabList = reactive([]);

function clearTabList() {
  while (tabList.length > 0) {
    tabList.pop();
  }
}

export function useTabs() {
  async function refreshTabList() {
    const tabs = await browser.tabs.query({
      windowType: 'normal'
    });

    clearTabList();
    tabList.push(...tabs);
  }

  function switchTo(tab) {
    // activate tab
    browser.tabs.highlight({ windowId: tab.windowId, tabs: [tab.index] });

    // focus on window with tab
    browser.windows.update(tab.windowId, { focused: true });
  }

  function close(tab) {
    // close tab
    browser.tabs.remove(tab.id);

    // update tab list
    refreshTabList();
  }

  return {
    tabList,
    refreshTabList,
    switchTo,
    close
  };
}
