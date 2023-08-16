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
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'HomeView',
  components: {
    BigIcons, ImageSlide, MainProducts
  },
  setup() {
    const pStore = productStore();
    const { products } = storeToRefs(pStore);
    return {
      products, pStore
    }
  },

  async created() {
    await this.pStore.getProducts();

  },

})

</script>