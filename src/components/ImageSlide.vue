<template>
    <div id="slide_image">
        <transition-group name="fade" tag="div">
            <div v-for="i in [currentIndex]" :key="i">
                <router-link v-if="currentPid" :to="{
                    name: 'oneProduct',
                    params: {
                        pid: currentPid
                    }
                }"><img v-if="currentImg !== null" :src="'src/assets/images/products/' + currentImg" v-bind:alt="currentImg" />
                </router-link>
            </div>
        </transition-group>
        <a class="prev" @click="prev" href="#">&#10094; Previous</a>
        <a class="next" @click="next" href="#">Next &#10095;</a>

    </div>
</template>

<script lang="ts">

export default {
    name: 'ImageSlide',
    props: {
        products: {
            type: Array,
        }
    },

    data() {
        return {
            timer: null, currentIndex: 0
        }
    },
    methods: {
        startSlide: function () {
            this.timer = setInterval(this.next, 4000);
        },

        next: function () {
            this.currentIndex += 1;
        },
        prev: function () {
            this.currentIndex -= 1;
        }
    },
    computed: {
        currentImg: function () {
            return this.images[Math.abs(this.currentIndex) % this.images.length];
        },
        currentPid: function () {
            return this.pids[Math.abs(this.currentIndex) % this.pids.length];
        },
        images: function () {
            let imgList = [];
            for (let product of this.products) {
                imgList.push(product.image)
            }
            return imgList

        },
        pids: function () {
            let pidList = [];
            for (let product of this.products) {
                pidList.push(product.pid)
            }
            return pidList

        },

    },
    mounted() {
        this.startSlide();

    },


}

</script>
