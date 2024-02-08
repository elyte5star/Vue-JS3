<template>
    <div v-if="products">
        <div id="slide_image" v-on:mouseover="stopSlide" v-on:mouseleave="startSlide">
            <transition-group name="fade" tag="div">
                <div v-for="i in [currentIndex]" :key="i">
                    <router-link v-if="currentPid" :to="{
                        name: 'oneProduct',
                        params: {
                            pid: currentPid
                        }
                    }"><img v-if="currentImg !== null" :src="'src/assets/images/products/' + currentImg"
                            v-bind:alt="currentImg" />
                    </router-link>
                </div>
            </transition-group>
            <a class="prev" @click="prev" href="#">&#10094; Previous</a>
            <a class="next" @click="next" href="#">Next &#10095;</a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type {ProductsResponse } from '@/helpers/my-types';

export default defineComponent({
    name: 'ImageSlide',
    setup() {
        let timer: ReturnType<typeof setInterval> | undefined;
        return {
            timer
        }
    },
    props: {
        productsRes: {
            type: Object as PropType<ProductsResponse>,
            required: true
        }
    },

    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        startSlide: function () {
            this.timer = setInterval(this.next, 2000);
        },

        next: function () {
            this.currentIndex += 1;
        },
        prev: function () {
            this.currentIndex -= 1;
        },
        stopSlide: function () {
            clearInterval(this.timer);
        }
    },
    computed: {
        products: function(){
            return this.productsRes?.products
            
        },
        currentImg: function () {
            return this.images[Math.abs(this.currentIndex) % this.images.length];
        },
        currentPid: function () {
            return this.pids[Math.abs(this.currentIndex) % this.pids.length];
        },
        images: function () {
            let imgList = [];
            for (const product of this.products) {
                imgList.push(product.image)
            }
            return imgList;

        },
        pids: function () {
            let pidList = [];
            for (let product of this.products) {
                pidList.push(product.pid)
            }
            return pidList;

        },

    },
    mounted() {
        this.startSlide();

    },


})

</script>
