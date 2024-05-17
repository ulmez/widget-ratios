import { defineStore } from 'pinia';
import ApiService from './../services/ApiService';

export const useWidgetStore = defineStore('taskWidgetStore', {
   state: () => ({
        ratios: {},
    }),
    getters: {
        /**
         * @returns {any}
         */
        getReport() {
            return this.ratios;
        },
    },
    actions: {
        /**
         *
         *
         * @param {any} data
         * @returns {Promise<any>}
         */
        async loadRatios(data) {
            const ratios = (await ApiService.getRatios(data)).data;

            this.ratios = ratios;
        }
    },
});
