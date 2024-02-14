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
        <PaginationBar :page-size-menu="false" :border="true" align="center" :total-row="totalRow" v-model="pageNum"
            @change="pageChange" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Product, ProductsQuery } from '@/helpers/my-types';
import { PaginationBar } from 'v-page';
import type { PageInfo } from 'v-page/types';

export default defineComponent({
    name: 'MainProducts',
    props: {
        products: {
            type: Array<Product>,
            required: true
        },
        totalRow: {
            type: Number,
            required: true
        },
        pN: {
            type: Number,
            required: true
        }
    },
    data(){
        return{pageNum:this.pN}
    },
    methods: {
        getImage(image: string): string {
            return new URL('../../src/assets/images/products/' + image, import.meta.url).href
        },
        pageChange(data: PageInfo) {
            const params:ProductsQuery = {
                page: (data.pageNumber - 1),
                size: this.totalRow,

            }
            this.$emit('changePage', params);
        }
    },
    


})
</script>