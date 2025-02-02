import { userAuthStore } from "@/stores/auth_store";
import { loadingStore } from "@/stores/loading";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { AuthHeader } from "./my-types";

import router from "@/router/index";

import logger from "./logger";


export const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
    
});

function authHeader(url: string): AuthHeader | {} {
    const authStorage: any = localStorage.getItem('userLoggedIn');
    const userLoggedIn = JSON.parse(authStorage);
    const isLoggedIn = !!userLoggedIn?.accessToken;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL ?? "");
    if (isLoggedIn && isApiUrl) {
        return { Authorization: 'Bearer ' + userLoggedIn.accessToken, 'Content-Type': 'application/json', Accept: 'application/json' };
    } else {
        return {};
    }
}

axiosInstance.interceptors.request.use((config) => {
    config.timeout = import.meta.env.VITE_APP_WAIT_TIME ?? 0;
    const isloading = loadingStore();
    isloading.setLoading(true);
    config.headers = authHeader(import.meta.env.VITE_API_URL ?? "") as AuthHeader;
    return config;
},
    function (error) {
        logger.error('Request Error');
        return Promise.reject(error);

    }
);



axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const isloading = loadingStore();
    isloading.setLoading(false);
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const isloading = loadingStore();

    isloading.setLoading(false);

    const { userLoggedIn, logout } = userAuthStore()

    if (!error.response) {
        if (error.code === 'ERR_NETWORK' && error.message.includes('Network Error')) {
            logout();
            router.replace({ name: 'ServerError' });
            return Promise.reject(error)
        } else if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
            return Promise.reject(error);
        } else {
            logger.error(error);
            return Promise.reject(error);
        }

    } else {
        if ([401, 403].includes(error.response.status) && userLoggedIn) {
            logger.error(error);
            logout();
            return Promise.reject(error);

        }
        // router.replace({ name: 'Home' });
        return Promise.reject(error);
    }

});



