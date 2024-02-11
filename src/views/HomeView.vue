<template>
  <div class="home">
    <BigIcons />
    <ImageSlide v-bind:products="products" />
    <MainProducts v-bind:itemsResult="productsRes"  />
    <MainFooter  />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import BigIcons from '../components/BigIcons.vue';
import ImageSlide from '../components/ImageSlide.vue';
import MainProducts from '../components/Products.vue';
import MainFooter from '../components/Footer.vue';
import { storeToRefs } from 'pinia';
import { productStore } from '@/stores/products'
import { defineComponent } from 'vue'



export default defineComponent({
  name: 'HomeView',
  components: {
    BigIcons, ImageSlide, MainProducts,MainFooter
  },
  setup() {
    const pStore = productStore();
    const  { products,productsRes } = storeToRefs(pStore);
    return {
      products, pStore, productsRes
    }

  },
  methods: {
    async getAllProducts(){
      await this.pStore.getProducts();

    }
  },

  created() {
    this.getAllProducts();
  },


  

})

</script>