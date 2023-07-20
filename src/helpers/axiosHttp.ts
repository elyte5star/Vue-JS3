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
    let authStorage: any = localStorage.getItem('user')
    let user = JSON.parse(authStorage);
    const isLoggedIn = !!user?.access_token;
    const isApiUrl = url.startsWith(process.env.VUE_API_URL || "");
    if (isLoggedIn && isApiUrl) {
        return { Authorization: 'Bearer ' + user.access_token, 'Content-Type': 'application/json', 'Accept': 'application/json' };
    } else {
        return {};
    }
}


async function handleResponse(response: any) {
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
    // check for error response

    if (!response.ok) {
        const { user, logout } = userAuthStore();
        if ([401, 403].includes(response.status) && user) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Session Expired",
                footer: '<a href="/login">Please, log in again!.</a>'
            })
            logout();
        }
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }

    return data;
}


