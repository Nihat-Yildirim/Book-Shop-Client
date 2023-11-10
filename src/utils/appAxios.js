import store from '@/store';
import axios from 'axios';

const appAxios = axios.create({
    baseURL : "https://localhost:7297/api",
    headers: {
        "Content-Type": "application/json",
    },
});

appAxios.interceptors.request.use(async (config)=>{
    if(store.state.AuthModule.accessToken == null && store.state.AuthModule.refreshToken == null)
        return config

    let accessToken = store.state.AuthModule.accessToken.token;
    let accessTokenExpiration = new Date(store.state.AuthModule.accessToken.expiration);
    let refreshTokenExpiration = new Date(store.state.AuthModule.refreshToken.expiration);
    const date = new Date();

    if(accessTokenExpiration > date)
        config.headers["Authorization"] = `Bearer ${accessToken}`;

    if(accessTokenExpiration < date && refreshTokenExpiration > date){
        await store.dispatch("AuthModule/refreshTokenLogin");
        config.headers["Authorization"] = `Bearer ${store.state.AuthModule.accessToken.token}`;
    }

    if(accessToken.expiration < date && refreshToken.expiration < date)
        console.log("Kullanıcı Yeniden Login Olması Gerek !");

    return config;
});  

export default appAxios;