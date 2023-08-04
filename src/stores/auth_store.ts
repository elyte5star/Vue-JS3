


import { defineStore } from 'pinia';


import { userAlertStore } from './alert';

import router from '@/router/index'

import { axiosInstance } from '@/helpers/axiosHttp';

import type { tokenData } from '@/helpers/my-types';


let user = localStorage.getItem('user')

export const userAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: user ? JSON.parse(user) : null as tokenData | null,
        returnUrl: '', alert: userAlertStore(),
    }),
    actions: {

        async login(userData: object) {
            try {
                const response = await axiosInstance.post('auth/token', userData);
                if (response.data.success && response.data.token_data !== undefined) {
                    this.user = response.data.token_data;
                    localStorage.setItem('user', JSON.stringify(response.data.token_data));
                    return router.push(this.returnUrl || '/');

                } else {
                    this.alert.error(response.data.message);
                }

            } catch (error: any) {
                console.log(error);
            }
        },

        async cloudLogin(userData: object) {
            try {
                const response = await axiosInstance.post('auth/get_token', userData);

                if (response.data.success && response.data.token_data !== undefined) {

                    this.user = response.data.token_data;

                    localStorage.setItem('user', JSON.stringify(response.data.token_data));
                    return router.push(this.returnUrl || '/');


                } else {

                    this.alert.error(response.data.message);
                }
            } catch (error: any) {
                console.log(error);
            }

        },

        async logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
            return true;
        }

    }
});
