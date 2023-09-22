import axios from 'axios';

const appAxios = axios.create({
    baseURL : "https://localhost:7297/api"
});

export default appAxios;