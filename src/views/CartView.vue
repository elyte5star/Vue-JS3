
<template>
    <div v-if="cart" id="basket" class="basket">
        <div class="container">
            <div class="wrapper wrapper-content animated fadeInRight">
                <div class="row">
                    <div class="col-md-8">
                        <div class="ibox">
                            <div class="ibox-title">
                                <span class="pull-right">(<strong>{{ itemsInCart }}</strong>) items</span>
                                <h5>Items in your cart</h5>
                            </div>
                            <div v-for="item in  cart " v-bind:key="item.pid" class="ibox-content">
                                <div class="table-responsive">
                                    <table class="table shoping-cart-table">
                                        <tbody>
                                            <tr>
                                                <td :style="{ width: '90px' }">
                                                    <div class="cart-product-imitation">
                                                        <img :src="'src/assets/images/products/' + item.image"
                                                            v-bind:alt="item.name">
                                                    </div>
                                                </td>
                                                <td class="desc">
                                                    <h3>
                                                        <router-link :to="{ name: 'oneProduct', params: { pid: item.pid } }"
                                                            class="text-navy">
                                                            {{ item.name }}
                                                        </router-link>
                                                    </h3>
                                                    <p class="small">
                                                        {{ item.details }}
                                                    </p>
                                                    <dl class="small m-b-none">
                                                        <dt>Description</dt>
                                                        <dd>{{ item.description }}</dd>
                                                    </dl>

                                                    <div class="m-t-sm">
                                                        <a href="#" class="text-muted"><i class="fa fa-gift"></i> Add gift
                                                            package</a>
                                                        |
                                                        <a href="javascript:void(0)" v-on:click="removeFromCart(item)"
                                                            class="text-muted"><i class="fa fa-trash"></i> Remove
                                                            item</a>
                                                    </div>
                                                </td>

                                                <td v-if="item.discount.length > 0">
                                                    £{{ item.price }}
                                                    <s class="small text-muted">$230,00</s>
                                                </td>
                                                <td :style="{ width: '65px' }">
                                                    <input type="text" :disabled="isDisabled" class="form-control"
                                                        :placeholder="item.quantity">
                                                </td>
                                                <td>
                                                    <h4 :style="{ width: '130px' }">
                                                        £{{ item.calculated_price }}
                                                    </h4>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div v-if="!itemsInCart" class="col-sm-12 empty-cart-cls text-center">
                                <img src="src/assets/images/emptyCart.png" width="130" height="130"
                                    class="img-fluid mb-4 mr-3" alt="empty_cart_icon">
                                <h3><strong>Your Cart is Empty</strong></h3>
                                <h4>Add something to make me happy :)</h4>
                                <a href="/" class="btn btn-primary cart-btn-transform m-3" data-abc="true">continue
                                    shopping</a>
                            </div>

                            <div v-if="itemsInCart" class="ibox-content">
                                <router-link id="cont_shopping" :to="{ name: 'Home' }"><i class="fa fa-arrow-left"></i>
                                    Continue
                                    shopping</router-link>
                            </div>

                        </div>

                    </div>
                    <div class="col-md-4">
                        <div class="ibox">
                            <div class="ibox-title">
                                <h5>Cart Summary</h5>
                            </div>
                            <div class="ibox-content">
                                <span>
                                    Total
                                </span>
                                <h2 class="font-bold">
                                    £{{ totalPrice }}
                                </h2>
                                <hr>
                                <span class="text-muted small">
                                    *For Norway, Denmark and Sweden applicable sales tax will be applied
                                </span>
                                <hr>
                                <div class="payment-info">
                                    <form @submit.prevent="makeReservation" class="payment-form" action="/checkout">
                                        <div class="d-flex justify-content-between"><span>Card
                                                details</span><img v-if="user" class="rounded"
                                                :src="'src/assets/images/' + userImage" v-bind:alt="user.username"
                                                width="30">
                                        </div>
                                        <span class="type d-block mt-3 mb-1">Card type</span>
                                        <div id="card_type" class="card_type">
                                            <label class="radio"><input v-model="card" type="radio" name="card"
                                                    value="mastercard">
                                                <span><img width="30" :src="'src/assets/images/credit_cards/mastercard.png'"
                                                        alt="mastercard" /></span>
                                            </label>

                                            <label class="radio"> <input v-model="card" type="radio" name="card"
                                                    value="visa">
                                                <span><img width="30" :src="'src/assets/images/credit_cards/visa.png'"
                                                        alt="visarcard" /></span> </label>

                                            <label class="radio"> <input v-model="card" type="radio" name="card"
                                                    value="amex">
                                                <span><img width="30" :src="'src/assets/images/credit_cards/amex.png'"
                                                        alt="amex" /></span>
                                            </label>


                                            <label class="radio"><input v-model="card" type="radio" name="card"
                                                    value="paypal"><span><img width="30"
                                                        :src="'src/assets/images/credit_cards/paypal.png'"
                                                        alt="paypal" /></span>
                                            </label>
                                        </div>

                                        <div>
                                            <label class="credit-card-label">Name on card:</label><input type="text"
                                                class="form-control credit-inputs" v-model="nameOnCard" placeholder="Name">
                                        </div>
                                        <div>
                                            <label class="credit-card-label">Card number:</label>
                                            <input type="tel" class="form-control credit-inputs" v-model.number="cardNumber"
                                                pattern="[0-9]*" maxlength="16" placeholder="0000 0000 0000 0000"
                                                minlength="16">
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6"><label class="credit-card-label">Card Expiry:
                                                </label><input type="month" v-model="expiryDate"
                                                    class="form-control credit-inputs" placeholder="12/24"></div>
                                            <div class="col-md-6"><label class="credit-card-label">CVV</label><input
                                                    type="tel" v-model.number="cardCvv" class="form-control credit-inputs"
                                                    placeholder="342" pattern="[0-9]*" maxlength="3"></div>
                                        </div>
                                        <hr class="line">
                                        <div class="d-flex justify-content-between information">
                                            <span>Subtotal</span><span>£{{
                                                totalPrice
                                            }}</span>
                                        </div>
                                        <div class="d-flex justify-content-between information">
                                            <span>Shipping</span><span>£0.00</span>
                                        </div>
                                        <div class="d-flex justify-content-between information"><span>Total(Incl.
                                                taxes)</span><span>£{{ totalPrice }}</span>
                                        </div>
                                        <hr>
                                        <div class="m-t-sm">
                                            <div class="btn-group cart-action">
                                                <button :disabled="!itemsInCart" class="btn btn-primary pull-right"
                                                    type="submit" id="submit_payment"><i class="fa fa fa-shopping-cart"></i>
                                                    Checkout</button>
                                                <button :disabled="!itemsInCart" @click="emptyCart()" id="empty_cart"
                                                    class="btn btn-warning pull-right"><i class="fa fa-cart-arrow-down"></i>
                                                    Empty
                                                    cart</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>

                        <div class="ibox">
                            <div class="ibox-title">
                                <h5>Support</h5>
                            </div>
                            <div class="ibox-content text-center">
                                <h3><i class="fa fa-phone"></i> +47 409 78 057</h3>
                                <h3><a href="mailto:elyte5star@gmail.com"><i class="fa fa-envelope-o"></i>
                                        elyte5star@gmail.com</a></h3>
                                <h3><a href="https://github.com/elyte5star"><i class="fa fa-github"></i> elyte5star</a></h3>
                                <span class="small">
                                    Please contact with us if you have any questions. We are avalible 24h.
                                </span>
                            </div>
                        </div>

                        <div class="ibox">
                            <div class="ibox-content">

                                <p class="font-bold">
                                    Other products you may be interested
                                </p>
                                <hr>
                                <div>
                                    <a href="#" class="product-name"> Product 1</a>
                                    <div class="small m-t-xs">
                                        Many desktop publishing packages and web page editors now.
                                    </div>
                                    <div class="m-t text-righ">

                                        <a href="#" class="btn btn-xs btn-outline btn-primary">Info <i
                                                class="fa fa-long-arrow-right"></i> </a>
                                    </div>
                                </div>
                                <hr>
                                <div>
                                    <a href="#" class="product-name"> Product 2</a>
                                    <div class="small m-t-xs">
                                        Many desktop publishing packages and web page editors now.
                                    </div>
                                    <div class="m-t text-righ">

                                        <a href="#" class="btn btn-xs btn-outline btn-primary">Info <i
                                                class="fa fa-long-arrow-right"></i> </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <router-view></router-view>
</template>

<script lang="ts">

import { userCartStore } from '@/stores/cart';
import { userAuthStore } from '@/stores/auth_store';
import { userAlertStore } from '@/stores/alert';
import type { Item } from '@/helpers/my-types';
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
export default defineComponent({
    name: 'CartView',
    setup(props, ctx) {
        const authStore = userAuthStore();
        const { user } = storeToRefs(authStore);
        const cartStore = userCartStore()
        const { cart, itemsInCart } = storeToRefs(cartStore);
        return {
            user, authStore, cartStore, cart, itemsInCart
        }
    },

    data() {
        return {
            recommendationList: [],
            isDisabled: true, card: null, expiryDate: null, cardCvv: null,
            cardNumber: null, nameOnCard: null,
        }
    },
    methods: {
        removeFromCart(item: Item) {
            this.cartStore.removeFromCart(item);
        },
        emptyCart() {
            this.cartStore.clearCart();
        },
        async makeReservation() {
            if (this.cardNumber && this.expiryDate && this.card && this.cardCvv && this.nameOnCard) {

                let bookingDetails = {
                    cart: this.cart,
                    total_price: this.totalPrice,
                    paymentDetails: {
                        cardNumber: Number(this.cardNumber),
                        expiryDate: this.expiryDate,
                        cardCvv: Number(this.cardCvv),
                        nameOnCard: this.nameOnCard,
                    }
                }

                // await this.cartStore.checkOut(bookingDetails)
                // this.cardNumber = null
                // this.expiryDate = null
                // this.cardCvv = null
                // this.card = null
                // this.nameOnCard = null
            } else {
                const alertStore = userAlertStore();
                if (!this.cardNumber) alertStore.error("Card number required");
                if (!this.card) alertStore.error("Card type required");
                if (!this.nameOnCard) alertStore.error("Card Holder name required");
                if (!this.expiryDate) alertStore.error("Expiry Date required");
                if (!this.cardCvv) alertStore.error("CVV number required");

            }


        }

    },

    computed: {
        totalPrice() {
            let amount = 0;
            for (let item of this.cart) {
                amount += item.calculated_price;
            }
            return Math.round((amount + Number.EPSILON) * 100) / 100;
        },
        userImage() {
            return this.user.admin ? "admin-icon.png" : "user-icon.png";
        }
    }

})
</script>

