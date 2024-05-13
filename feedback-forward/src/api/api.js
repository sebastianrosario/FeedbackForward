import https from 'https';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    hostname: process.env.REEACT_APP_API_HOST || 'http://localhost:3000/',
    httpsAgent: https.Agent({
        rejectUnauthorized: false,
    }),
});


export const getUserById = id => api.get(`/item/${id}`);
export const createUser = payload => api.post(`/user`, payload);


const apis = {
    getUserById,
    createUser
};

module.exports = {
    apis
}