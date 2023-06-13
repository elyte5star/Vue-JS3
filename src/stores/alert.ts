import { defineStore } from 'pinia';



export const userAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: {}
    }),
    actions: {
        success(message: String) {
            this.alert = { message, type: 'alert-success' };
        },
        error(message: String) {
            this.alert = { message, type: 'alert-danger' };
        },
        clear() {
            this.alert = {};
        }
    }
});