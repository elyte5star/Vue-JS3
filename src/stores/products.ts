import { defineStore } from 'pinia';

import { userAlertStore } from './alert';
import { axiosInstance } from '@/helpers/axiosHttp';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { loadingStore } from "@/stores/loading";
import type { Product, Review, ProductsResponse, ProductsQuery, CreateReview} from '@/helpers/my-types';

export const productStore = defineStore({
    id: 'products',
    state: () => ({
        pageNum:0,numberOfElements:0,products: [] as Product[], productsRes: null as ProductsResponse | null, product: null as Product | null, alertStore: userAlertStore(), key: "", reviews: [] as Review[], stockQuantity: 0, productRecommendations: Array()
    }),
    actions: {
        async getProducts(data?: ProductsQuery) {
            try {
                const response = await axiosInstance.get('products', { params: data });
                const isloading = loadingStore();
                if (!response.data.success) {
                    console.error(response.data.message);
                    isloading.setLoading(true);
                    return;
                }
                this.productsRes = response.data.result
                this.products = this.productsRes?.products!
                this.numberOfElements = this.productsRes?.numberOfElements!
                this.pageNum = this.productsRes?.number!   
            } catch (error: any) {
                console.log(error);
            }

        },

        async submitReview(review: CreateReview) {
            try {
                const isloading = loadingStore();
                const response = await axiosInstance.post('products/create/review', review);
                if (!response.data.success) {
                    this.alertStore.error(response.data.message || 'Operation unsuccessful');
                    isloading.setLoading(true);
                    return;
                }
                this.alertStore.success('Good job!' + " Yor review has been saved!");

            } catch (error: any) {
                console.log(error);
            }

        },

        async getProductById(pid: string):Promise<void>  {
            try {
                const response = await axiosInstance.get('products/' + pid);
                if (!response.data.success) {
                    this.alertStore.error(response.data.message || 'Operation unsuccessful');
                    return;
                }
                this.product = response.data.result;
                this.stockQuantity = this.product?.stock_quantity!;
                this.reviews = this.product?.reviews!;

            } catch (error: any) {
                console.log(error);
            }
        },
        async deleteProductById(pid: string) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                showLoaderOnConfirm: true,
            }).then(async (result: any) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axiosInstance.delete('products/' + pid);
                        if (!response.data.success) {
                            this.alertStore.error(response.data.message || 'Operation unsuccessful');
                            return;
                        }
                        this.products = this.products.filter(x => x.pid !== pid);//Shallow copy
                        this.alertStore.success('The product has been deleted.');


                    } catch (error: any) {
                        console.log(error);
                    }

                }

            })
        },

        async sortProductsBykey(data?: ProductsQuery) {
            console.log(data);
        }

    }

});