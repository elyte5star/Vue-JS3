
import { defineStore } from 'pinia';


//Persisting the Cart and cart count
const cart = localStorage.getItem('cart');

const cartCount = window.localStorage.getItem('cartCount');

import { axiosInstance } from '@/helpers/axiosHttp';

import type { ItemInCart, UserReservation } from '@/helpers/my-types';

import { sleep } from '@/helpers/script';

import { userAlertStore } from './alert';

import logger from '@/helpers/logger';

import { loadingStore } from './loading';

const countTime = import.meta.env.VITE_APP_WAIT_TIME;

export const userCartStore = defineStore({
    id: 'cart',
    state: () => ({
        cart: cart ? JSON.parse(cart) : [] as ItemInCart[], cartCount: cartCount ? parseInt(cartCount) : 0,
        alertStore: userAlertStore(), countTime: countTime ? parseInt(countTime) : 0,loading:loadingStore()
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
                this.alertStore.error("Product not found in cart!")

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
                let finished = false;
                for (let i = 0; i < 2; i++) {
                    const jobResponse = await axiosInstance.get("job/" +  jobId);
                if (jobResponse.data.result.jobStatus.finished) {
                        finished = true;
                        logger.debug("Job done");
                        this.loading.setLoading(false)
                        break;
                    }
                    this.loading.setLoading(true)
                    await sleep(this.countTime / 2);
                }
                if (!finished) {
                    this.alertStore.error("Timeout!");
                    logger.error("Timeout! check the worker server!.")
                    this.loading.setLoading(false)
                    return;
                }
                const getBookingResponse = await axiosInstance.get("qbooking/job/" +  jobId);
                if (getBookingResponse.data.success) {
                    this.alertStore.success("Your order was successfull, your Order number  is:"+ getBookingResponse.data.result.result);
                    this.clearCart();
                    logger.debug(getBookingResponse.data.result);
                }

            } catch (error: any) {
                this.alertStore.error(error.response.data.message)
                logger.error(error);
            }

        }

    }
});