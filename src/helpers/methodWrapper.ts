import { userAuthStore } from "@/stores/auth_store";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios';

export const fetchMethodWrapper = {
    get: request('get', ''),
    post: request('post', ''),
    put: request('put', ''),
    delete: request('delete', '')
};

function request(method: string, url: string, body = {}) {
    return axios.create({
        method: method,
        baseURL: process.env.VUE_API_URL,
        url: url,
        timeout: 5000,
        headers: { common: authHeader(process.env.VUE_API_URL) },
        data: body
    });

}



// function request(method: string) {
//     return (url: string, body) => {
//         const requestOptions = {
//             method,
//             headers: authHeader(url)
//         };
//         if (body) {
//             requestOptions.headers['Content-Type'] = 'application/json';
//             requestOptions.body = JSON.stringify(body);
//         }
//         return fetch(url, requestOptions).then(handleResponse);
//     }
// }





function authHeader(url: string | any) {
    // return auth header with jwt if user is logged in and request is to the api url
    //const { user } = userAuthStore();
    let user: any = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = !!user?.access_token;
    const isApiUrl = url.startsWith(process.env.VUE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: 'Bearer ' + user.access_token, 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}


async function handleResponse(response) {
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


