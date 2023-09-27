
import { defineStore } from 'pinia';


//Persisting the Cart and cart count
let cart = localStorage.getItem('cart');

let itemsInCart = window.localStorage.getItem('cartCount');

import { axiosInstance } from '@/helpers/axiosHttp';

import type { Item, userReservation } from '@/helpers/my-types';

import { sleep } from '@/helpers/script';

import { userAlertStore } from './alert';

import router from '@/router/index';

let countTime = import.meta.env.VITE_APP_WAIT_TIME;

export const userCartStore = defineStore({
    id: 'cart',
    state: () => ({
        cart: cart ? JSON.parse(cart) : [], itemsInCart: itemsInCart ? parseInt(itemsInCart) : 0,
        alertStore: userAlertStore(), countTime: countTime ? parseInt(countTime) : 0
    }),
    actions: {
        addToCart(item: Item, volume: number) {

            for (let i = 0; i < volume; i++) {
                let found = this.cart.find((itemInCart: Item) => itemInCart.pid == item.pid);

                if (found) {
                    found.quantity++;
                    found.calculated_price = found.quantity * found.price

                } else {
                    item.quantity = 1;
                    item.calculated_price = item.price
                    this.cart.push(item);
                }

                localStorage.setItem('cart', JSON.stringify(this.cart));
                this.itemsInCart = this.cart.reduce((accumulator: number, currentValue: Item) => accumulator + currentValue.quantity, 0);//this.cart.length;
                localStorage.setItem('cartCount', JSON.stringify(this.itemsInCart));

            }
        },
        removeFromCart(itemToBeRemoved: Item) {

            let indexItemToBeRemoved = this.cart.findIndex((a: Item) => a.pid === itemToBeRemoved.pid);

            if (indexItemToBeRemoved > -1) {

                let item = this.cart[indexItemToBeRemoved];

                item.quantity--;

                if (item.quantity == 0) {

                    this.cart.splice(indexItemToBeRemoved, 1);

                } else {

                    item.calculated_price = item.quantity * item.price

                }

                localStorage.setItem('cart', JSON.stringify(this.cart));
                this.itemsInCart = this.cart.reduce((accumulator: number, currentValue: Item) => accumulator + currentValue.quantity, 0);
                localStorage.setItem('cartCount', JSON.stringify(this.itemsInCart));

            } else {
                this.alertStore.success("Product not found in cart!")

            }

        },
        clearCart() {
            while (this.cart.length > 0) {
                this.cart.pop();
            }
            this.itemsInCart = 0;
            this.cart = [];
            localStorage.removeItem('cart');
            localStorage.removeItem('cartCount');

        },
        async checkOut(bookingDetails: userReservation) {
            try {
                const response = await axiosInstance.post('booking/create', bookingDetails);
                if (!response.data.success) {
                    this.alertStore.error(response.data.message);
                    return;
                }

                router.push({ name: 'Confirm', query: { oid: response.data.oid } });
                this.clearCart();

            } catch (error: any) {
                console.log(error);
            }

        },
        async checkOutQueue(bookingDetails: userReservation) {
            try {
                const response = await axiosInstance.post('qbooking/create', bookingDetails);
                let job_id = response.data.job_id;
                let finished = false;
                if (!response.data.success) {
                    this.alertStore.error("Couldnt create reservation!.");
                    console.error(response.data.message)
                    return null;
                }
                for (let i = 0; i < 5; i++) {
                    let job_response = await axiosInstance.get("job/" + job_id);

                    if (job_response.data.job.job_status.is_finished) {
                        finished = true;
                        break;
                    }
                    console.log(`Waiting ${(i * this.countTime)/1000} seconds...`);
                    await sleep(i * this.countTime);
                }
                if (!finished) {
                    this.alertStore.error("Timeout!");
                    console.error("Timeout! check the worker server!.")
                    return null;
                }
                let getBookingResponse = await axiosInstance.get("qbooking/" + job_id);

                if (getBookingResponse.data.success) {
                    router.push({ name: 'Confirm', query: { oid: getBookingResponse.data.result_data.oid } });
                    this.clearCart();

                } else {
                    this.alertStore.error(response.data.message);
                }

            } catch (error: any) {
                console.error(error);
            }

        }

    }
});