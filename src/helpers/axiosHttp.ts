import { userAuthStore } from "@/stores/auth_store";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: process.env.VUE_API_URL,
    timeout: 5000,
    headers: { common: authHeader(process.env.VUE_API_URL || "") },


});

export function updateHeader() {
    axiosInstance.defaults.headers.common = authHeader(process.env.VUE_API_URL || "");

}


function authHeader(url: string) {
    let authStorage: any = localStorage.getItem('user');
    let user = JSON.parse(authStorage);
    const isLoggedIn = !!user?.access_token;
    const isApiUrl = url.startsWith(process.env.VUE_API_URL || "");
    if (isLoggedIn && isApiUrl) {
        return { Authorization: 'Bearer ' + user.access_token, 'Content-Type': 'application/json', 'Accept': 'application/json' };
    } else {
        return {};
    }
}


axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { user, logout } = userAuthStore()
    if ([401, 403].includes(error.response.status) && user) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Session Expired",
            footer: '<a href="/login">Please, log in again!.</a>'
        })
        return logout();

    }

    return Promise.reject(error);
});



