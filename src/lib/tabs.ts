import * as browser from 'webextension-polyfill';
import { derived, writable, get } from 'svelte/store';

export { search, searchResults, total, refresh, switchTo, close, getFavicon };

const tabs = writable<browser.Tabs.Tab[]>([]);

const search = writable('');

const searchResults = derived([tabs, search], ([$tabs, $search]) => {
  return $tabs.filter((tab) => {
    const searchString = $search.toLowerCase();
    const tabTitle = tab.title?.toLowerCase();
    const tabUrl = tab.url?.toLowerCase();

    const titleMatch = tabTitle?.includes(searchString);
    const urlMatch = tabUrl?.includes(searchString);

    return titleMatch || urlMatch ? true : false;
  });
});

const total = derived(tabs, ($tabs) => {
  return $tabs.length;
});

async function refresh() {
  const browserTabs = await browser.tabs.query({ windowType: 'normal' });
  tabs.set(browserTabs);
  console.log(get(tabs));
}

function switchTo(windowId: number, tabIndex: number) {
  browser.tabs.highlight({ windowId: windowId, tabs: tabIndex, populate: false });
  browser.windows.update(windowId, { focused: true });
}

function close(tabId: number) {
  browser.tabs.remove(tabId);
  refresh();
}

function getFavicon(url: string) {
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
