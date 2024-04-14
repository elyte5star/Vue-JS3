
import { defineStore } from 'pinia';


//Persisting the Cart and cart count
const cart = localStorage.getItem('cart');

const cartCount = window.localStorage.getItem('cartCount');

import { axiosInstance } from '@/helpers/axiosHttp';

import type { ItemInCart, UserReservation } from '@/helpers/my-types';

import { sleep } from '@/helpers/script';

import { userAlertStore } from './alert';

import logger from '@/helpers/logger';

import router from '@/router/index';

const countTime = import.meta.env.VITE_APP_WAIT_TIME;

export const userCartStore = defineStore({
    id: 'cart',
    state: () => ({
        cart: cart ? JSON.parse(cart) : [] as ItemInCart[], cartCount: cartCount ? parseInt(cartCount) : 0,
        alertStore: userAlertStore(), countTime: countTime ? parseInt(countTime) : 0
    }),
    actions: {
        addToCart(item: ItemInCart, volume: number) {

            for (let i = 0; i < volume; i++) {
                const found = this.cart.find((itemInCart: ItemInCart) => itemInCart.pid == item.pid);

                if (found) {
                    found.quantity++;
                    found.calculatedPrice = found.quantity * found.price

                } else {
                    item.quantity = 1;
                    item.calculatedPrice = item.price
                    this.cart.push(item);
                }

                localStorage.setItem('cart', JSON.stringify(this.cart));
                this.cartCount = this.cart.reduce((accumulator: number, currentValue: ItemInCart) => accumulator + currentValue.quantity, 0);//this.cart.length;
                localStorage.setItem('cartCount', JSON.stringify(this.cartCount));

            }
        },
        removeFromCart(itemToBeRemoved: ItemInCart) {

            const indexItemToBeRemoved = this.cart.findIndex((a: ItemInCart) => a.pid === itemToBeRemoved.pid);

            if (indexItemToBeRemoved > -1) {

                const item = this.cart[indexItemToBeRemoved];

                item.quantity--;

                if (item.quantity == 0) {

                    this.cart.splice(indexItemToBeRemoved, 1);

                } else {

                    item.calculatedPrice = item.quantity * item.price

                }

                localStorage.setItem('cart', JSON.stringify(this.cart));
                this.cartCount= this.cart.reduce((accumulator: number, currentValue: ItemInCart) => accumulator + currentValue.quantity, 0);
                localStorage.setItem('cartCount', JSON.stringify(this.cartCount));

            } else {
                this.alertStore.success("Product not found in cart!")

            }

        },
        clearCart() {
            while (this.cart.length > 0) {
                this.cart.pop();
            }
            this.cartCount = 0;
            this.cart = [] as ItemInCart[];
            localStorage.removeItem('cart');
            localStorage.removeItem('cartCount');

        },
        
        async checkOutQueue(bookingDetails: UserReservation) {
            try {
                const response = await axiosInstance.post('qbooking/create', bookingDetails);
                const jobId = response.data.result;
                // let finished = false;
                // for (let i = 0; i < 5; i++) {
                //     const job_response = await axiosInstance.get("qbooking/job/" +  jobId);
                //     if (job_response.data.result.job_status.is_finished) {
                //         finished = true;
                //         break;
                //     }
                //     logger.warn(`Waiting ${(i * this.countTime)/1000} seconds...`);
                //     await sleep(i * this.countTime);
                // }
                // if (!finished) {
                //     this.alertStore.error("Timeout!");
                //     logger.error("Timeout! check the worker server!.")
                //     return null;
                // }
                const jobResponse = await axiosInstance.get("job/" +  jobId);
                const getBookingResponse = await axiosInstance.get("qbooking/job/" +  jobId);

                if (getBookingResponse.data.success) {
                    //router.push({ name: 'Confirm', query: { oid: getBookingResponse.data.result.oid } });
                    //this.clearCart();
                    logger.info(response.data.result);
                }

               

            } catch (error: any) {
                this.alertStore.error(error.response.data.message)
                logger.error(error);
            }

        }

    }
});