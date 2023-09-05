
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
                                <img :src="'src/assets/images/emptyCart.png'" width="130" height="130"
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
                                    <form @submit.prevent="makeReservation" class="payment-form">
                                        <div class="d-flex justify-content-between"><span>Payment
                                                details</span><img v-if="user" class="rounded"
                                                :src="'src/assets/images/' + userImage" v-bind:alt="user.username"
                                                width="30">
                                        </div>
                                        <div id="part-1">
                                            <span class="type d-block mt-3 mb-1">Card type</span>
                                            <div id="card_type" class="card_type">
                                                <label class="radio"><input v-model="card" type="radio" name="card"
                                                        value="mastercard" id="mc">
                                                    <span><img width="30"
                                                            :src="'src/assets/images/credit_cards/mastercard.png'"
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
                                                    id="nameCard" class="form-control credit-inputs" v-model="nameOnCard"
                                                    placeholder="Ese Niccolio">
                                            </div>
                                            <div>
                                                <label for="cardNum" class="credit-card-label">Card number:</label>
                                                <input type="tel" class="form-control credit-inputs" v-model="cardNumber"
                                                    pattern="[0-9]*" id="cardNum" maxlength="16"
                                                    placeholder="0000000000000000" minlength="16">
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class="credit-card-label" for="expiryDate">Card Expiry:
                                                    </label><input id="expiryDate" type="month" v-model="expiryDate"
                                                        class="form-control credit-inputs" placeholder="12/24">
                                                </div>
                                                <div class="col-md-6"><label for="cvv-num"
                                                        class="credit-card-label">CVV</label><input type="tel" id="cvv-num"
                                                        v-model="cardCvv" class="form-control credit-inputs"
                                                        placeholder="342" minlength="3" pattern="[0-9]*" maxlength="3">
                                                </div>
                                            </div>
                                        </div>
                                        <hr class="line">
                                        <span>Billing Address</span>
                                        <div>
                                            <label class="billing-label" for="fname"><i class="fa fa-user"></i> Full
                                                Name:</label>
                                            <input v-model="bfname" class="form-control billing-inputs" type="text"
                                                id="fname" name="fullname" placeholder="Ese Niccolio">
                                        </div>
                                        <div>
                                            <label class="billing-label" for="email"><i class="fa fa-envelope"></i>
                                                Email:</label>
                                            <input v-model="bemail" class="form-control billing-inputs" type="email"
                                                id="email" name="email" placeholder="elyte5star@example.com">
                                        </div>

                                        <div>
                                            <label class="billing-label" for="adr"> <i class="fa fa-address-card-o"></i>
                                                Address:</label>
                                            <input v-model="baddress" class="form-control billing-inputs" type="text"
                                                id="adr" name="address" placeholder="542 W. 15th Street" maxlength="20">
                                        </div>
                                        <div>
                                            <label class="billing-label" for="city"><i class="fa fa-institution"></i>
                                                City:</label>
                                            <input v-model="bcity" class="form-control billing-inputs" type="text" id="city"
                                                name="city" placeholder="Lagos or St. Laos" maxlength="16">
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6"><label class="billing-label" for="state"> Country:</label>
                                                <select v-model="bcountry" class="form-select" id="country" name="country">
                                                    <option v-if="countries" v-for="country in countries"
                                                        :key="country.text" :value=country.value>{{ country.text }}</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6"> <label class="billing-label" for="zip"> Zip:</label>
                                                <input v-model="bzip" class="form-control billing-inputs" type="text"
                                                    id="zip" name="zip" placeholder="10001">
                                            </div>
                                        </div><br>

                                        <div class="row billing-checkbox">
                                            <label class="billing-label">
                                                <input v-model="bsameadr" type="checkbox" @click="showShippingAddress"
                                                    name="sameadr"> Billing address
                                                same as shipping
                                            </label>
                                        </div><br>

                                        <div id="part-2">
                                            <hr class="line">
                                            <span>Shipping Address</span>
                                            <div>
                                                <label class="billing-label" for="sfname"><i class="fa fa-user"></i> Full
                                                    Name:</label>
                                                <input v-model="sfname" class="form-control billing-inputs" type="text"
                                                    id="sfname" name="fullname" placeholder="Ese Niccolio">
                                            </div>
                                            <div>
                                                <label class="billing-label" for="email"><i class="fa fa-envelope"></i>
                                                    Email:</label>
                                                <input v-model="semail" class="form-control billing-inputs" type="email"
                                                    id="semail" name="email" placeholder="elyte5star@example.com">
                                            </div>

                                            <div>
                                                <label class="billing-label" for="sadr"> <i
                                                        class="fa fa-address-card-o"></i>
                                                    Address:</label>
                                                <input v-model="saddress" class="form-control billing-inputs" type="text"
                                                    id="sadr" name="address" placeholder="542 W. 15th Street"
                                                    maxlength="20">
                                            </div>
                                            <div>
                                                <label class="billing-label" for="scity"><i class="fa fa-institution"></i>
                                                    City:</label>
                                                <input v-model="scity" class="form-control billing-inputs" type="text"
                                                    id="scity" name="scity" placeholder="Warri or St. Laos" maxlength="16">
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6"><label class="billing-label" for="state">
                                                        Country:</label>
                                                    <select v-model="scountry" class="form-select" id="scountry"
                                                        name="country">
                                                        <option v-if="countries" v-for="country in countries"
                                                            :key="country.text" :value=country.value>{{ country.text }}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6"> <label class="billing-label" for="szip"> Zip:</label>
                                                    <input v-model="szip" class="form-control billing-inputs" type="text"
                                                        id="szip" name="zip" placeholder="10001">
                                                </div>
                                            </div><br>
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
import { countries, validateFullName, hasOnlyDigits, is_valid_Email, isObjEmpty } from '@/helpers/script';
import type { Item, CreditCard, ShippingAddress, userReservation, BillingAddress } from '@/helpers/my-types';
import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';

export default defineComponent({
    name: 'CartView',
    setup() {
        const authStore = userAuthStore();
        const { user } = storeToRefs(authStore);
        const cartStore = userCartStore();
        const { cart, itemsInCart } = storeToRefs(cartStore);
        return {
            user, cartStore, cart, itemsInCart
        }
    },

    data() {
        return {
            recommendationList: [], bfname: null, bsameadr: false, bemail: null,
            bcountry: null, bzip: null, bcity: null, baddress: null,
            isDisabled: true, card: null, expiryDate: null, cardCvv: null,
            cardNumber: null, nameOnCard: null, countries: countries, alertStore: userAlertStore(),
            sfname: null, semail: null,
            scountry: null, szip: null, scity: null, saddress: null,
        }
    },
    methods: {
        removeFromCart(item: Item) {
            this.cartStore.removeFromCart(item);
        },
        showShippingAddress() {
            const shipDiv = (<HTMLInputElement>document.getElementById('part-2'));
            if (this.bsameadr) {
                shipDiv.style.display = '';

            } else {
                shipDiv.style.display = 'none';

            }
        },
        emptyCart() {
            this.cartStore.clearCart();
        },
        expirationValidation(yearMonth: string | null) {
            if (!yearMonth) return false;
            const [exYear, exMonth]: any = yearMonth.split("-");
            let today = new Date();
            let expireday = new Date();
            expireday.setFullYear(exYear, exMonth, 1);
            if (expireday < today) {
                return false;
            }
            return true;

        },
        checkShippingAddress(): ShippingAddress | {} {
            if (validateFullName(this.sfname)
                && is_valid_Email(this.semail)
                && this.saddress && this.scity
                && this.checkPostCodeAndCountry(this.scountry, this.szip)
            ) {
                const billingAddress = {
                    sfname: this.sfname,
                    semail: this.semail,
                    saddress: this.saddress,
                    scountry: this.scountry,
                    szip: this.szip,
                    scity: this.scity
                }

                return billingAddress;
            }

            return {};
        },
        checkBillingAddress(): BillingAddress | {} {
            if (validateFullName(this.bfname)
                && is_valid_Email(this.bemail)
                && this.baddress && this.bcity
                && this.checkPostCodeAndCountry(this.bcountry, this.bzip)
            ) {
                const shippingAddress = {
                    bfname: this.bfname,
                    bemail: this.bemail,
                    baddress: this.baddress,
                    bcountry: this.bcountry,
                    bzip: this.bzip,
                    bcity: this.bcity
                }

                return shippingAddress;
            }

            return {};
        },
        checkCreditCardDetails(): CreditCard | {} {
            if (this.card && validateFullName(this.nameOnCard)
                && hasOnlyDigits(this.cardNumber)
                && this.expirationValidation(this.expiryDate)
                && hasOnlyDigits(this.cardCvv)) {
                const creditCardDetails = {
                    cardType: this.card,
                    cardNumber: this.cardNumber,
                    expiryDate: this.expiryDate,
                    cardCvv: this.cardCvv,
                    nameOnCard: this.nameOnCard,
                }

                return creditCardDetails;

            }
            return {}
        },
        checkPostCodeAndCountry(countryCode: string | null, zip: string | null): boolean {
            if (!postcodeValidatorExistsForCountry(countryCode as string)) {
                this.alertStore.error("No valid postcode for the selected country!");
                (<HTMLInputElement>document.getElementById('country')).focus();
                return false;

            } else if (!postcodeValidator(zip as string, countryCode as string)) {
                this.alertStore.error("Invalid postcode for the selected country!");
                (<HTMLInputElement>document.getElementById('zip')).focus();
                return false;

            } else {
                return true;
            }

        },
        invalidFeedback() {
            if (!this.card) {
                this.alertStore.error("Card type required");

            } else if (!validateFullName(this.nameOnCard)) {
                (<HTMLInputElement>document.getElementById('nameCard')).focus();
                this.alertStore.error('Enter card holder full name (first & last name).');

            } else if (!hasOnlyDigits(this.cardNumber)) {
                (<HTMLInputElement>document.getElementById('cardNum')).focus();
                this.alertStore.error("Card number required");

            } else if (!this.expirationValidation(this.expiryDate)) {
                this.alertStore.error("Please select a valid expiry date");
                (<HTMLInputElement>document.getElementById('expiryDate')).focus();

            } else if (!hasOnlyDigits(this.cardCvv)) {
                (<HTMLInputElement>document.getElementById('cvv-num')).focus();
                this.alertStore.error("CVV number required");

                //Billing Address;

            } else if (!validateFullName(this.bfname)) {
                (<HTMLInputElement>document.getElementById('fname')).focus();
                this.alertStore.error('Enter full name (first & last name)(Billing).');


            } else if (!is_valid_Email(this.bemail)) {
                (<HTMLInputElement>document.getElementById('email')).focus();
                this.alertStore.error('Enter valid email (Billing).');

            } else if (!this.baddress) {
                (<HTMLInputElement>document.getElementById('adr')).focus();
                this.alertStore.error("Billing Address required");

            } else if (!this.bcity) {
                (<HTMLInputElement>document.getElementById('city')).focus();
                this.alertStore.error("City required (Billing)");

            } else if (!this.checkPostCodeAndCountry(this.bcountry, this.bzip)) {

                return true;
            }
            //Shipping Address;
            else if (!this.bsameadr && !validateFullName(this.sfname)) {
                (<HTMLInputElement>document.getElementById('sfname')).focus();
                this.alertStore.error('Enter full name (first & last name).Shipping');


            } else if (!this.bsameadr && !is_valid_Email(this.semail)) {
                (<HTMLInputElement>document.getElementById('semail')).focus();
                this.alertStore.error('Enter valid email.');

            } else if (!this.bsameadr && !this.saddress) {
                (<HTMLInputElement>document.getElementById('sadr')).focus();
                this.alertStore.error("Shipping Address required");

            } else if (!this.bsameadr && !this.scity) {
                (<HTMLInputElement>document.getElementById('scity')).focus();
                this.alertStore.error("City required");

            } else if (!this.bsameadr && !this.checkPostCodeAndCountry(this.scountry, this.szip)) {

                return true;
            }

            // no error  
            else {
                return false;

            }
            return true
        },
        async makeReservation(): Promise<void> {
            this.alertStore.reset();
            const paymentDetails = this.checkCreditCardDetails();
            const billingAddress = this.checkBillingAddress();
            const shippingDetails = this.checkShippingAddress();

            let reservation: userReservation = {} as userReservation;
            if (this.bsameadr && !isObjEmpty(paymentDetails) && !isObjEmpty(billingAddress)) {

                reservation = {
                    cart: this.cart,
                    total_price: this.totalPrice,
                    payment_details: paymentDetails as CreditCard,
                    billing_address: billingAddress as BillingAddress

                }
                console.log(reservation)
                await this.cartStore.checkOut(reservation);
            } else if (!this.bsameadr && !isObjEmpty(paymentDetails) && !isObjEmpty(billingAddress) && !isObjEmpty(shippingDetails)) {
                reservation = {
                    cart: this.cart,
                    total_price: this.totalPrice,
                    payment_details: paymentDetails as CreditCard,
                    billing_address: billingAddress as BillingAddress,
                    shipping_details: shippingDetails as ShippingAddress

                }
                await this.cartStore.checkOut(reservation);
            }

            else {
                this.invalidFeedback();
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
        },
        emptyCartImage() {
            return new URL('../../src/images/emptyCart.png', import.meta.url).href

        }

    }

})
</script>

