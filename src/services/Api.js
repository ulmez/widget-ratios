// @ts-nocheck
import axios from 'axios';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default() => {
  return axios.create({
    baseURL: VITE_BACKEND_URL//'http://172.22.42.232:8082'
    // baseURL: 'http://localhost:8082'
    //baseURL: 'https://fts-backend.edger.finance/'
  });
}


// http://198.211.109.6/api
// http://localhost:8080/api
// 'http://'+process.env.VUE_APP_BACKEND_URL+'/api'
// Git Test
