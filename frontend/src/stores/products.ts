import { defineStore } from 'pinia';

import { userAlertStore } from './alert';
import { fetchMethodWrapper } from '@/helpers/methodWrapper';
import Swal from 'sweetalert2/dist/sweetalert2';


const baseURL = import.meta.env.VITE_API_URL + 'products';


export const productStore = defineStore({
    id: 'products',
    state: () => ({
        products: Array(), product: {}, alertStore: userAlertStore(), key: "", reviews: Array(), quantity: 0, productRecommendations: Array()
    }),
    actions: {
        async getProducts() {
            const response = await fetchMethodWrapper.get(baseURL);
            if (!response.success) {
                this.alertStore.error(response.message || 'Couldnt get products');
                return;
            }
            this.products = response.products;

        },
        async submitReview(review: any) {
            const response = await fetchMethodWrapper.post(baseURL + '/create/review', review);
            if (!response.success) {
                this.alertStore.error(response.message || 'Operation unsuccessful');
                return;
            }
            this.alertStore.success('Good job!' + " Yor review has been saved!");

        },
        async getProductById(pid: string) {
            const response = await fetchMethodWrapper.get(baseURL + '/' + pid);
            if (!response.success) {
                this.alertStore.error(response.message || 'Operation unsuccessful');
                return;
            }
            this.product = response.product;
            this.quantity = response.product.stock_quantity;
            this.reviews = response.product.reviews

        },
        async deleteProductById(pid: string) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result: any) => {
                if (result.isConfirmed) {
                    const response = await fetchMethodWrapper.delete(baseURL + '/' + pid);
                    if (!response.success) {
                        this.alertStore.error(response.message || 'Operation unsuccessful');
                        return;
                    }
                    this.products = this.products.filter(x => x.pid !== pid);//Shallow copy
                    this.alertStore.success('The product has been deleted.');
                }

            })
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