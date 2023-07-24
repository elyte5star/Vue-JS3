
import { defineStore } from 'pinia';


//Persisting the Cart and cart count
let cart = localStorage.getItem('cart');

let itemsInCart = window.localStorage.getItem('cartCount');

import { axiosInstance } from '@/helpers/axiosHttp';

import type { Product } from '@/helpers/my-types';

import { userAlertStore } from './alert';


export const userCartStore = defineStore({
    id: 'cart',
    state: () => ({
        isRequestLoading: false, cart: cart ? JSON.parse(cart) : [], itemsInCart: itemsInCart ? parseInt(itemsInCart) : 0, alertStore: userAlertStore()
    }),
    actions: {
        addToCart(product: Product, volume: number) {
            for (let i = 0; i < volume; i++) {
                this.cart.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.itemsInCart = this.cart.length;
            localStorage.setItem('cartCount', JSON.stringify(this.itemsInCart));


        },
        removeFromCart(product: Product) {
            const itemToBeRemoved = product
            this.cart.splice(this.cart.findIndex((a: Product) => a.pid === itemToBeRemoved.pid), 1)
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.itemsInCart = this.cart.length;
            localStorage.setItem('cartCount', JSON.stringify(this.itemsInCart));
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
        async checkOut(bookingDetails: any) {

            const response = await axiosInstance.post('booking/create', bookingDetails);
            if (!response.data.success) {
                this.alertStore.error(response.data.message || 'Couldnt make reservation');
                return;
            }
            this.alertStore.success("Booking with id " + response.data.oid + " created!")
            this.clearCart();

        },
        async checkOutQueue(bookingDetails: any) {
            const response = await axiosInstance.post('q_booking/create', bookingDetails);
            if (response.data.success) {
                this.alertStore.success("Booking with id " + response.data.oid + " created!")
                this.clearCart();

            } else {
                this.alertStore.error(response.data.message);
            }

        }
    }
});