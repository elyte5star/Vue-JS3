
import { defineStore } from 'pinia';

import { userAlertStore } from './alert';

import router from '@/router/index'

import { axiosInstance } from '@/helpers/axiosHttp';

import type { CloudLogin, tokenData } from '@/helpers/my-types';
import { URLSearchParams } from "url";


const userLoggedIn = localStorage.getItem('userLoggedIn')

export const userAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        userLoggedIn: userLoggedIn ? JSON.parse(userLoggedIn) : null as tokenData | null,
        returnUrl: '', alert: userAlertStore(),
    }),
    actions: {
        async login(userData: URLSearchParams) {
            try {
                const response = await axiosInstance.post('auth/form-login', userData);
                if (response.data.success && response.data.result !== undefined) {
                    this.userLoggedIn = response.data.result;
                    localStorage.setItem('userLoggedIn', JSON.stringify(response.data.result));
                    router.push(this.returnUrl || '/');
                } else {
                    this.alert.error(response.data.message);
                }
            } catch (error: any) {
                if (Object.prototype.hasOwnProperty.call(error.response.data.result, "disabled") && error.response.data.result.disabled) {
                    router.replace({ name: 'OtpEmail', query: error.response.data.result })
                } else if (Object.prototype.hasOwnProperty.call(error.response.data.result, "locked") && error.response.data.result.locked) {
                    router.replace({ name: 'OtpEmail', query: error.response.data.result })
                } else {
                    this.alert.error(error.response.data.message);
                }

            }
        },

        async cloudLogin(userData: CloudLogin) {
            try {
                const response = await axiosInstance.post('auth/get-token', userData);
                if (response.data.success && response.data.result !== undefined) {
                    this.userLoggedIn = response.data.result;
                    localStorage.setItem('userLoggedIn', JSON.stringify(response.data.result));
                    router.push(this.returnUrl || '/');

                }
                this.alert.error(response.data.message);
            } catch (error: any) {
                if (Object.prototype.hasOwnProperty.call(error.response.data.result, "disabled") && error.response.data.result.disabled) {
                    router.replace({ name: 'OtpEmail', query: error.response.data.result })
                } else if (Object.prototype.hasOwnProperty.call(error.response.data.result, "locked") && error.response.data.result.locked) {
                    router.replace({ name: 'OtpEmail', query: error.response.data.result })
                } else {
                    this.alert.error(error.response.data.message);
                }

            }

        },
        async logout() {
            this.userLoggedIn = null;
            localStorage.removeItem('userLoggedIn');
            router.push({ name: 'Login' });
            return true;
        }

    }
});
