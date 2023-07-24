<template>
    <div class="products">
        <main id="container_" class="container">
            <h1 v-if="products">Products</h1>
            <article class="framed column" :id="'' + product.pid" v-for="product in products" v-bind:key="product.pid">
                <div class="prod_left">
                    <img :src="getImage(product.image)" :alt="product.name">
                    <div class="category">{{ product['category'] }}</div>
                </div>

                <div class="prod_right">
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.description }}</p>

                    <h4>£{{ product.price }}</h4>
                    <p v-if="product.stock_quantity">Available in stock {{ product.stock_quantity }}.</p>
                    <p v-else>Out of stock {{ product.stock_quantity }}.</p>
                </div>
                <router-link :to="{
                    name: 'oneProduct',

                    params: {
                        pid: product.pid
                    }
                }">
                    <div class="details">Details</div>
                </router-link>
            </article>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Product } from '@/helpers/my-types';

export default defineComponent({
    name: 'MainProducts',
    props: {
        products: {
            type: Array<Product>,
            required: true
        }
    },
    methods: {
        getImage(image: string): string {
            return new URL('../../src/assets/images/products/' + image, import.meta.url).href
        }
    },
    


})
</script>
