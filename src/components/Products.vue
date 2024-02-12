<template>
    <div class="products">
        <main id="container_" class="container">
            <h1 id="products" v-if="products">Products</h1>
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
import { defineComponent } from 'vue';
import PaginationBar  from 'v-page';
import type { PageInfo } from 'v-page/types';
import { storeToRefs } from 'pinia';
import { productStore } from '@/stores/products';

export default defineComponent({
    name: 'MainProducts',
    setup() {
        const pStore = productStore();
        const { productsRes } = storeToRefs(pStore);
        return {
            pStore, productsRes
        }

    },
    methods: {
        async getAllProducts() {
            await this.pStore.getProducts();

        },
        getImage(image: string): string {
            return new URL('../../src/assets/images/products/' + image, import.meta.url).href
        },
        async pageChange(data: PageInfo) {
            const params = {
                page: (data.pageNumber - 1),
                size: 12,
            }
            //console.log(params) // { pageNumber: 1, pageSize: 10 }
            if(!this.productsRes?.first) return await this.pStore.getProducts(params); 
            console.log(params) 

        }

    },
    computed: {
        products() {
            return this.productsRes?.products;
        },
        totalRow() {
            return this.productsRes?.numberOfElements;
        },
        pageNum() {
            return this.productsRes?.pageable.pageNumber;
        }

    },
    created() {
        this.getAllProducts();
    },
})
</script>