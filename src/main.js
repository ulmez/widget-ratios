import { defineCustomElement } from 'vue';
import appKul from './app-kul.ce.vue';

import { createPinia, setActivePinia } from "pinia";

// Here you create a standalone pinia
setActivePinia(createPinia());

const element = defineCustomElement(appKul);

customElements.define('chart-window', element);
