import { defineStore } from 'pinia';

import { userAlertStore } from './alert';
import { axiosInstance } from '@/helpers/axiosHttp';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import type { Product, Review, ProductsResponse, ProductsQuery, CreateReview} from '@/helpers/my-types';
import logger from '@/helpers/logger';


export const productStore = defineStore({
    id: 'products',
    state: () => ({
        pageNum:0,numberOfElements:0,products: [] as Product[], productsRes: null as ProductsResponse | null, product: null as Product | null, alertStore: userAlertStore(), key: "", reviews: [] as Review[], stockQuantity: 0
    }),
    actions: {
        async getProducts(data?: ProductsQuery):Promise<void> {
            try {
                const response = await axiosInstance.get('products', { params: data });
                if (response.data.success) {
                    this.productsRes = response.data.result
                    this.products = this.productsRes?.products!
                    this.numberOfElements = this.productsRes?.numberOfElements!
                    this.pageNum = this.productsRes?.number!   
                    return;
                }
                
            } catch (error: any) {
                this.alertStore.error(error.response.data.message|| 'Operation unsuccessful');
                logger.error(error);
            }

        },

        async submitReview(review: CreateReview):Promise<void> {
            try {
                const response = await axiosInstance.post('products/create/review', review);
                if (response.data.success) {
                    this.alertStore.success('Good job!' + " Yor review has been saved!");
                    return;
                }
            } catch (error: any) {
                this.alertStore.error(error.response.data.message|| 'Operation unsuccessful');
                logger.error(error);
            }

        },

        async getProductById(pid: string):Promise<void>  {
            try {
                const response = await axiosInstance.get('products/' + pid);
                if (response.data.success) {
                    this.product = response.data.result;
                this.stockQuantity = this.product?.stockQuantity!;
                this.reviews = this.product?.reviews!;
                return;

                }
                
            } catch (error: any) {
                this.alertStore.error(error.response.data.message|| 'Operation unsuccessful');
                logger.error(error);
            }
        },
        async deleteProductById(pid: string) :Promise<void>{
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
                        if (response.data.success) {
                            this.products = this.products.filter(x => x.pid !== pid);//Shallow copy
                            this.alertStore.success('The product has been deleted.');
                            return;
                        }
                       

                    } catch (error: any) {
                        this.alertStore.error(error.response.data.message|| 'Operation unsuccessful');
                        logger.error(error);
                    }

                }

            })
        },

        async sortProductsBykey(data?: ProductsQuery) {
            try {
                const response = await axiosInstance.get('products', { params: data });
                if (response.data.success) {
                    this.productsRes = response.data.result
                    this.products = this.productsRes?.products!
                    this.numberOfElements = this.productsRes?.numberOfElements!
                    this.pageNum = this.productsRes?.number!   
                    return;
                }
                
            } catch (error: any) {
                this.alertStore.error(error.response.data.message|| 'Operation unsuccessful');
                logger.error(error);
            }
        }

    }

});