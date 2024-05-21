import { defineCustomElement } from 'vue';
import chartRatios from './chart-ratios.ce.vue';

import { createPinia, setActivePinia } from "pinia";

// Here you create a standalone pinia
setActivePinia(createPinia());

const element = defineCustomElement(chartRatios);

customElements.define('chart-ratios', element);
