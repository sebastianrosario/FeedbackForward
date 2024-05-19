import https from 'https';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env .REACT_APP_API_URL || 'http://localhost:3000/api',
    hostname: import.meta.env .REEACT_APP_API_HOST || 'http://localhost:3000/',
});


export const getUserById = id => api.get(`/item/${id}`);
export const createUser = payload => api.post(`/user`, payload);


const apiActions = {
    getUserById,
    createUser
};

export default apiActions