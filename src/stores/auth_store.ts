


import { defineStore } from 'pinia';


import { userAlertStore } from './alert';

import router from '@/router/index'

import { postToTokenEndpoint } from "@/helpers/script";

import { axiosInstance, updateHeader } from '@/helpers/axiosHttp';

import type { tokenData } from '@/helpers/my-types';

const APIURL = process.env.VUE_API_URL + 'auth';

let user = localStorage.getItem('user')

export const userAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: user ? JSON.parse(user) : null as tokenData | null,
        returnUrl: '', alert: userAlertStore(),
    }),
    actions: {

        async login(userData: object) {
            const response = await postToTokenEndpoint(APIURL + '/token', userData)
            if (response.success && response.token_data !== undefined) {
                this.user = response.token_data;
                localStorage.setItem('user', JSON.stringify(response.token_data));
                updateHeader();
                return router.push(this.returnUrl || '/');

            } else {
                this.alert.error(response.message);
            }
        },

        async cloudLogin(userData: object) {
            try {
                const response = await axiosInstance.post(APIURL + '/get_token', userData);

                if (response.data.success && response.data.token_data !== undefined) {

                    this.user = response.data.token_data;

                    localStorage.setItem('user', JSON.stringify(response.data.token_data));
                    updateHeader();
                    return router.push(this.returnUrl || '/');


                } else {

                    this.alert.error(response.data.message);
                }
            } catch (error: any) {
                this.alert.error(error);
            }

        },

        async logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        }

    }
});
