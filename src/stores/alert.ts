import { defineStore } from 'pinia';

import type { Alert } from '@/helpers/my-types';

export const userAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null as Alert | null
    }),
    actions: {
        success(message: string) {
            this.alert = { message: message, type: 'alert-success', loading: false };
        },
        error(message: string) {
            this.alert = { message: message, type: 'alert-danger', loading: false };
        },
        loading(message: string, onLoad: boolean) {
            if(onLoad)this.alert = { message: message, type: 'alert-warning', loading: onLoad };
            else this.reset();
        },
        reset() {
            this.alert = null;
        }
    }
});