


import { defineStore } from 'pinia';


import { userAlertStore } from './alert';

import router from '@/router/index'

import { postToTokenEndpoint } from "@/helpers/script";

import { fetchMethodWrapper } from '@/helpers/methodWrapper';

const APIURL = process.env.VUE_API_URL + 'auth';
let user = localStorage.getItem('user')
export const userAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: user ? JSON.parse(user) : null,
        returnUrl: '', alert: userAlertStore(), 
    }),
    actions: {

        async login(userData: object) {
            const response = await postToTokenEndpoint(APIURL + '/token', userData)
            if (response.success && response.token_data !== undefined) {

                this.user = response.token_data;

                localStorage.setItem('user', JSON.stringify(response.token_data));

                return router.push(this.returnUrl || '/');

            } else {
                this.alert.error(response.message);
            }
        },

        async cloudLogin(userData: object) {

            const response = await fetchMethodWrapper.post(APIURL + '/get_token', userData);
            if (response.success && response.token_data !== undefined) {

                this.user = response.token_data;

                localStorage.setItem('user', JSON.stringify(response.token_data));

                return router.push(this.returnUrl);


            } else {

                this.alert.error(response.message);
            }


        },

        async logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        }

    }
});
