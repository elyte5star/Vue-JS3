import { userAuthStore } from "@/stores/auth_store";
import { loadingStore } from "@/stores/loading";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { AuthHeader } from "./my-types";

import router from "@/router/index";


export const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

function authHeader(url: string): AuthHeader | {} {
    const authStorage: any = localStorage.getItem('user');
    const user = JSON.parse(authStorage);
    const isLoggedIn = !!user?.access_token;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL ?? "");
    if (isLoggedIn && isApiUrl) {
        return { Authorization: 'Bearer ' + user.access_token, 'Content-Type': 'application/json', Accept: 'application/json' };
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
        console.log('Request Error');
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

    const { user, logout } = userAuthStore()

    if (!error.response) {

        if (error.code === 'ERR_NETWORK' && error.message.includes('Network Error')) {

            console.log('Error: Network Error, Server is down');
            router.replace({ name: 'ServerError' });

            return Promise.reject(error)

        } else if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: "Request timed out",
                footer: '<a href="/">Please, return to home page.</a>',
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: new URL('../../src/assets/images/ai.jpg', import.meta.url).href,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image'

            })

            return Promise.reject(error);

        } else {

            console.log(error);
            return Promise.reject(error);

        }

    } else {

        if ([401, 403].includes(error.response.status) && user) {

            Swal.fire({
                icon: 'warning',
                title: '<strong>Oops...</strong>',
                text: 'Session Expired',
                allowOutsideClick: false,
                imageUrl: new URL('../../src/assets/images/ai.jpg', import.meta.url).href,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image'
            }).then(logout)

        }

        return Promise.reject(error);
    }

});



