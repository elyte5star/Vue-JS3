<template>
  <div class="home">
    <BigIcons />
    <ImageSlide v-bind:products="products" />
    <MainProducts v-bind:products="products" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import BigIcons from '../components/BigIcons.vue'
import ImageSlide from '../components/ImageSlide.vue';
import MainProducts from '../components/Products.vue'

import { storeToRefs } from 'pinia';
import { productStore } from '@/stores/products'

export default {
  name: 'HomeView',
  components: {
    BigIcons, ImageSlide, MainProducts
  },
  data() {
    return {
      products: Array(),

    }
  },

  async created() {
    const pStore = productStore();
    await pStore.getProducts();
    const { products } = storeToRefs(pStore);
    this.products = products;

  },

}

</script>

