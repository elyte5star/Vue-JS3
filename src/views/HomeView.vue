<template>
  <div class="home">
    <BigIcons />
    <ImageSlide v-bind:products="products" />
    <AlertVue />
    <MainProducts v-bind:products="products" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import BigIcons from '../components/BigIcons.vue'
import ImageSlide from '../components/ImageSlide.vue';
import MainProducts from '../components/Products.vue'
import AlertVue from '@/components/Alert.vue'

import { storeToRefs } from 'pinia';
import { productStore } from '@/stores/products'


export default {
  name: 'HomeView',
  components: {
    BigIcons, ImageSlide, MainProducts, AlertVue
  },
  setup(props, ctx) {
    const pStore = productStore();
    const { products, isRequestLoading } = storeToRefs(pStore);
    return {
      products, isRequestLoading, pStore
    }
  },
  
  async created() {
    await this.pStore.getProducts();

  },

}

</script>

