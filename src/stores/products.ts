import { defineStore } from 'pinia';

import { userAlertStore } from './alert';
import { fetchMethodWrapper } from '@/helpers/methodWrapper';

const baseURL = import.meta.env.VITE_API_URL + 'products';


export const productStore = defineStore({
    id: 'products',
    state: () => ({
        products: Array(), product: {}, key: "", reviews: Array(), quantity: 0, productRecommendations: Array()
    }),
    actions: {
        async getProducts() {
            try {
                const response = await fetchMethodWrapper.get(baseURL);
                this.products = response.products;

            } catch (error) {
                this.products = { error };
            }

        },
        async submitReview(review: any) {
            const alertStore = userAlertStore();
            const response = await fetchMethodWrapper.post(baseURL + '/create/review', review);
            if (response["success"]) {
                alertStore.success('Good job!' + " Yor review has been saved!");
            } else {
                alertStore.error(response.message);

            }
        },
        async getProductById(pid: string) {
            const response = await fetchMethodWrapper.get(baseURL + '/' + pid);
            if (response["success"]) {
                this.product = response.product;
                this.quantity = response.product.stock_quantity;
                this.reviews = response.product.reviews

            } else {
                const alertStore = userAlertStore();
                alertStore.error(response.message);
            }

        },
        async deleteProductById(pid: string) {
            await fetchMethodWrapper.delete(baseURL + '/' + pid);

        },

        async sortProductsBykey(key: string) {
            try {
                this.key = key;
                this.products = await fetchMethodWrapper.get(baseURL + '/sort/' + key);

            } catch (error) {
                this.products = { error };
            }

        }

    }

});