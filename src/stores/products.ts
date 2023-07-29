import { defineStore } from 'pinia';

import { userAlertStore } from './alert';
import { axiosInstance } from '@/helpers/axiosHttp';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import type { Product, Review } from '@/helpers/my-types';


export const productStore = defineStore({
    id: 'products',
    state: () => ({
        isRequestLoading: false, products: [] as Product[], product: null as Product | null, alertStore: userAlertStore(), key: "", reviews: [] as Review[], stockQuantity: 0, productRecommendations: Array()
    }),
    actions: {
        async getProducts() {
            const response = await axiosInstance.get('products');

            if (!response.data.success) {
                this.alertStore.error(response.data.message || 'Couldnt get products');
                return;
            }
            this.products = response.data.products;

        },
        async submitReview(review: any) {
            const response = await axiosInstance.post('products/create/review', review);
            if (!response.data.success) {
                this.alertStore.error(response.data.message || 'Operation unsuccessful');
                return;
            }
            this.alertStore.success('Good job!' + " Yor review has been saved!");

        },
        async getProductById(pid: string) {
            const response = await axiosInstance.get('products/' + pid);
            if (!response.data.success) {
                this.alertStore.error(response.data.message || 'Operation unsuccessful');
                return;
            }
            this.product = response.data.product;
            this.stockQuantity = response.data.product.stock_quantity;
            this.reviews = response.data.product.reviews

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
                    const response = await axiosInstance.delete('products/' + pid);
                    if (!response.data.success) {
                        this.alertStore.error(response.data.message || 'Operation unsuccessful');
                        return;
                    }
                    this.products = this.products.filter(x => x.pid !== pid);//Shallow copy
                    this.alertStore.success('The product has been deleted.');
                }

            })
        },

        async sortProductsBykey(key: string) {
            console.log(key);
        }

    }

});