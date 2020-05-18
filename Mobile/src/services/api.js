import axios from 'axios';

const api = axios.create({
  baseURL: 'http://179.189.125.186:3333',
});

export default api;
