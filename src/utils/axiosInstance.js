import axios from 'axios';

export const base_url = 'https://ingendynamics.com';

const axiosInstance = axios.create({
    baseURL: base_url
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

export default axiosInstance;