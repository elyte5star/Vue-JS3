import { defineStore } from 'pinia';

import type { Alert } from '@/helpers/my-types';
import logger from '@/helpers/logger';

export const userAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null as Alert | null
    }),
    actions: {
        success(message: string) {
            this.alert = { message: message, type: 'alert-success' };
            logger.info(message)
        },
        error(message: string) {
            this.alert = { message: message, type: 'alert-danger' };
            logger.error(message)
        },
        info(message: string) {
            this.alert = { message: message, type: 'alert-info' };
            logger.info(message)
        },
        reset() {
            this.alert = null;
        }
    }
});