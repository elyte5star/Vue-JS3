import { defineStore } from 'pinia';

import type { Alert } from '@/helpers/my-types';

export const userAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null as Alert | null
    }),
    actions: {
        success(message: string) {
            this.alert = { message, type: 'alert-success' };
        },
        error(message: string) {
            this.alert = { message, type: 'alert-danger' };
        },
        reset() {
            this.alert = null;
        }
    }
});