<template>
    <div v-if="product">
        <!-- Product panel -->
        <div id="product" class="product">
            <router-link id="cont_shopping_product" :to="{ name: 'Home' }"><i class="fa fa-arrow-left"></i> Continue
                shopping</router-link>
            <h1>Product number: {{ product.pid }}</h1>
            <div class="framed1">
                <div class="prod_left">
                    <img v-if="product.image" :src="productImage(product.image)" :alt="product.name">
                    <div class="category1">{{ product.category }}</div>
                </div>
                <div class="prod_right1">
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.description }}</p>
                    <h3>Price: £{{ product.price }}</h3>
                    <p id="average_review"><i class="fa fa-star"></i> 3.2 ({{ reviewCount }} Reviews)</p>
                </div>
                <div class="prod_order">
                    <label id="lb4">Quantity(multiples of 1):
                        <input type="number" name="volume" id="num_items" placeholder="e.g 1,2" step="1"
                            :min="inStock ? 1 : 0" :max="inStock ? stockQuantity : 0" :value="inStock ? 1 : 0"></label>
                    <button class="form-btn" @click="addToCart()" :disabled="!inStock" type="button" id="add_to_cart">
                        Add to cart.
                    </button>
                </div>

            </div>
            <h1>Product Details</h1>
            <div class="product_details1">{{ product.details }}</div>
        </div>
        <!-- Product Review -->
        <div class="container product">
            <div class="wrapper wrapper-content animated fadeInRight">
                <div class="row">
                    <div class="col-md-7">
                        <div class="ibox">
                            <div class="ibox-title">
                                <span class="pull-right">(<strong>{{ reviewCount }}</strong>) reviews</span>
                                <h5>Product Review</h5>
                            </div>
                            <div v-for="review in  product.reviews " v-bind:key="review.rid" class="ibox-content">
                                <div class="table-responsive">
                                    <table class="table product-review-table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="cart-product-imitation">
                                                        <img :src="userImage('user-icon.png')" alt="client">
                                                    </div>

                                                </td>
                                                <td class="desc" :style="{ width: '500px' }">
                                                    <h5>Nickname :
                                                        {{ review.reviewerName }}
                                                    </h5>
                                                    <dl class="small m-b-none">
                                                        <dt>Description</dt>
                                                        <dd>{{ review.comment }}</dd>
                                                    </dl>

                                                    <dl class="small m-b-none">
                                                        <dt>Rating</dt>
                                                        <span id="old_rating" v-for="star in review.rating" :key="star">
                                                            <i class="fa fa-star"></i>
                                                        </span>
                                                    </dl>
                                                </td>
                                                <td colspan="2">
                                                    <dl class="small m-b-none">
                                                        <dt>Date</dt>
                                                        <dd>{{ formatDate(review.createdAt) }}</dd>
                                                    </dl>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="ibox-content">
                                <router-link id="cont_shopping" :to="{ name: 'Home' }"><i class="fa fa-arrow-left"></i>
                                    Continue
                                    shopping</router-link>
                            </div>

                        </div>

                    </div>
                    <!-- Write Product Review -->
                    <div class="col-md-5">
                        <div class="ibox">
                            <div class="ibox-title">
                                <h5>Write a Review</h5>
                            </div>
                            <div class="ibox-content">

                                <div class="review">
                                    <form @submit.prevent="onSubmitReview" class="reviewer-form" id="review_form">
                                        <p>
                                            <label for="reviewer_name">Nickname:</label>
                                            <input id="reviewer_name" v-model="reviewer_name" required autocomplete="on">
                                        </p>
                                        <p>
                                            <label for="reviewer_email">Email(We won't publish it):</label>
                                            <input id="reviewer_email" v-model="reviewer_email" required autocomplete="on">
                                        </p>
                                        <p>
                                            <label for="review">Review:</label>
                                            <textarea id="review" v-model="review" required></textarea>
                                        </p>

                                        <span id="evaluate">Evaluate this product : </span>
                                        <div class="rate">
                                            <input type="radio" v-model.number="rating" id="star5" name="rating"
                                                value="5" />
                                            <label for="star5" title="text">5 stars</label>
                                            <input type="radio" v-model.number="rating" id="star4" name="rating"
                                                value="4" />
                                            <label for="star4" title="text">4 stars</label>
                                            <input type="radio" v-model.number="rating" id="star3" name="rating"
                                                value="3" />
                                            <label for="star3" title="text">3 stars</label>
                                            <input type="radio" v-model.number="rating" id="star2" name="rating"
                                                value="2" />
                                            <label for="star2" title="text">2 stars</label>
                                            <input type="radio" v-model.number="rating" id="star1" name="rating"
                                                value="1" />
                                            <label for="star1" title="text">1 star</label>
                                        </div>


                                        <button class="form-btn" type="submit" id="submit_review">Submit review</button>
                                    </form>

                                </div>

                            </div>
                        </div>

                        <!-- Support -->

                        <div class="ibox">
                            <div class="ibox-title">
                                <h5>Support</h5>
                            </div>
                            <hr>
                            <span class="text-muted small">
                                *For Norway, Denmark and Sweden applicable sales tax will be applied
                            </span>
                            <hr>
                            <div class="ibox-content text-center">
                                <h6><i class="fa fa-phone"></i> +47 409 78 057</h6>
                                <h6><a href="mailto:elyte5star@gmail.com"><i class="fa fa-envelope-o"></i>
                                        elyte5star@gmail.com</a></h6>
                                <h6><a href="https://github.com/elyte5star"><i class="fa fa-github"></i> elyte5star</a></h6>
                                <span class="small">
                                    Please contact with us if you have any questions. We are avalible 24h.
                                </span>
                            </div>
                        </div>
                        <div v-if="products" class="ibox">
                        <p class="font-bold">Products you may be interested</p>
                        <div id="recommendation_list" v-for="item in Array.prototype.slice.call(products, 1, 3)" v-bind:key="item.pid" class="ibox-content">
                            <div class="table-responsive">
                                <table class="table shoping-cart-table">
                                    <tbody>
                                        <tr>
                                            <td :style="{ width: '90px' }">
                                                <div class="cart-product-imitation">
                                                    <img :src="'../../src/assets/images/products/' + item.image" v-bind:alt="item.name" />
                                                </div>
                                            </td>
                                            <td class="desc">
                                                <h3>
                                                    <router-link :to="{ name: 'oneProduct', params: { pid: item.pid } }" class="text-navy">
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
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                  
                    </div>

                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { productStore } from '../stores/products'
import { userCartStore } from '@/stores/cart'
import { userAlertStore } from '@/stores/alert'
import type { CreateReview, Item } from '@/helpers/my-types';

import { is_valid_Email } from '@/helpers/script';
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia';
import logger from '@/helpers/logger';

import moment from 'moment'


export default defineComponent({
    name: "ProductView",
    props: {
        pid: {
            type: String, required: true
        }
    },
    setup() {
        const pStore = productStore()
        const { product, stockQuantity, reviews,products } = storeToRefs(pStore);
        return {
            products,product, stockQuantity, reviews, pStore
        }

    },
    data() {
        return {
            moment: moment,
            reviewer_name: null,
            reviewer_email: null,
            rating: 0,
            review: '',
            cartStore: userCartStore(),
            alertStore: userAlertStore()
        }
    },

    methods: {
        addToCart() {
            const volume = parseInt((<HTMLInputElement>document.getElementById("num_items")).value);
            if (this.product) this.cartStore.addToCart(this.product as Item, volume);
        },
        formatDate(value: Date) {
            if (value) {
                return moment(String(value)).format("DD-MM-YYYY hh:mm");
            }
        },
        productImage(image: string): string {
            return new URL('../../src/assets/images/products/' + image, import.meta.url).href

        },
        userImage(image: string): string {
            return new URL('../../src/assets/images/' + image, import.meta.url).href

        },
        async getAProduct(): Promise<void> {
            if (this.pid) {
                await this.pStore.getProductById(this.pid);
                const elem = (<HTMLInputElement>document.getElementById("add_to_cart"));
                if (!this.stockQuantity) elem.innerHTML = "Out of Stock";
                else elem.innerHTML = "Add to Cart";

            } else {
                this.alertStore.error(" Supply a Product ID!");
            }


        },
        async onSubmitReview() {
            if (this.rating && is_valid_Email(this.reviewer_email)) {
                let productReview: CreateReview = {
                    reviewerName: this.reviewer_name || " ",
                    email: this.reviewer_email || " ",
                    rating: Number(this.rating),
                    comment: this.review,
                    pid: this.pid,
                }

                await this.pStore.submitReview(productReview)
                this.reviewer_name = null;
                this.rating = 0;
                this.review = '';
                this.reviewer_email = null;
                (<HTMLInputElement>document.getElementById('alert1')).scrollIntoView();
            } else {

                if (!this.rating) this.alertStore.error("Product evaluation required!");
                if (!is_valid_Email(this.reviewer_email)) this.alertStore.error("Error in email field!");

            }

        }

    },
    watch: {
        async stockQuantity(newVal) {

            logger.info(newVal, "this changed");

        }
    },
    created() {
        this.getAProduct();
    },
    computed: {
        inStock() {
            return Number(this.stockQuantity);
        },
        reviewCount() {
            return Number(this.reviews.length)
        }

    }

});

</script>

