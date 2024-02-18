
import { defineStore } from 'pinia';

import { userAlertStore } from './alert';

import router from '@/router/index'

import { axiosInstance } from '@/helpers/axiosHttp';

import type { CloudLogin, tokenData } from '@/helpers/my-types';
import { URLSearchParams } from "url";


const user = localStorage.getItem('user')

export const userAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: user ? JSON.parse(user) : null as tokenData | null,
        returnUrl: '', alert: userAlertStore(), emailSent: false
    }),
    actions: {
        async login(userData: URLSearchParams) {
            try {
                const response = await axiosInstance.post('auth/form-login', userData);
                if (response.data.success && response.data.result !== undefined) {
                    this.user = response.data.result;
                    localStorage.setItem('user', JSON.stringify(response.data.result));
                    router.push(this.returnUrl || '/');

                } else if (Object.prototype.hasOwnProperty.call(response.data.result,"enabled") && !response.data.result.enabled) {
                    router.replace({ name: 'Email', query: response.data.result })

                } else {
                    this.alert.error(response.data.message);
                }

            } catch (error: any) {
                this.alert.error(error.response.data.result);
                console.error(error);
            }
        },

        async cloudLogin(userData: CloudLogin) {
                const response = await axiosInstance.post('auth/get-token', userData);
                if (response.data.success && response.data.result !== undefined) {
                    this.user = response.data.result;
                    localStorage.setItem('user', JSON.stringify(response.data.result));
                    router.push({ name: 'oneUser', params: { userid: this.user.userid } })

                } else {
                    this.alert.error(response.data.message);
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
            } catch (error:any) { 
                console.error(error);

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
