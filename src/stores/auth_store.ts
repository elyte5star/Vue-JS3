
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
        returnUrl: '', alert: userAlertStore(), emailSent: false
    }),
    actions: {

        async login(userData: object) {
            try {
                const response = await axiosInstance.post('auth/token', userData);
                if (response.data.success && response.data.token_data !== undefined) {
                    this.user = response.data.token_data;
                    localStorage.setItem('user', JSON.stringify(response.data.token_data));
                    return router.push(this.returnUrl || '/');

                } else if (response.data.token_data.hasOwnProperty("active") && !response.data.active) {
                    router.push({ name: 'Email', query: response.data.token_data })

                } else {
                    this.alert.error(response.data.message);
                }

            } catch (error: any) {
                console.log(error);
            }
        },

        async cloudLogin(userData: object) {
            try {
                const response = await axiosInstance.post('auth/get-token', userData);

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
        async sendConfirmationEmail(data: object) {
            try {
                const response = await axiosInstance.post('auth/send-email-confirmation', data);
                if (response.data.success) {

                    console.log(response.data);
                    this.emailSent = true;
                } else {
                    this.alert.error(response.data);
                }

            } catch (error: any) {
                console.log(error);
            }

        },
        async confirmEmailToken(token: string) {
            try {
                token = token.trim();
                const response = await axiosInstance.get('auth/confirm-email/' + token);
                if (!response.data.success) {
                    console.log(response.data);
                    return;
                }
                return router.replace({ name: 'Confirm' })
            } catch (error) {

            }

        },
        async logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push({ name: 'Login' });
            return true;
        }

    }
});
