import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// fontawesome core
import { library } from '@fortawesome/fontawesome-svg-core';

// fontawesome component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// fontawesome icons
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

// add icons to core
library.add(faCircleXmark);

// load app
createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
