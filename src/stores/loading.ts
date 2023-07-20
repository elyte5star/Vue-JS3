import { defineStore } from 'pinia';



export const loadingStore = defineStore({
    id: 'loading',
    state: () => ({
        isLoading: false,
    }),
    actions: {
        setLoading(val: any) {
            this.isLoading = val;
        },
    }
});

