import Api from './Api.js';

export default {
    /**
     * 
     * @param {object} data
     * @returns {Promise<any>}
     */
    async getRatios(data) {
        return await Api().post('/api/ratios', data);
    },
}
