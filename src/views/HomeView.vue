<template>
  <div class="home">
    <BigIcons :totalRow="numberOfElements" :pN="pageNum" @sortProducts="getProductsPages" />
    <ImageSlide v-bind:products="products" />
    <MainProducts v-bind:products="products" :pN="pageNum" :totalRow="numberOfElements" @changePage="getProductsPages" />
    <MainFooter />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import BigIcons from '../components/BigIcons.vue'
import ImageSlide from '../components/ImageSlide.vue';
import MainProducts from '../components/Products.vue'
import MainFooter from '../components/Footer.vue';
import { storeToRefs } from 'pinia';
import { productStore } from '@/stores/products'
import { defineComponent } from 'vue'
import type { ProductsQuery} from '@/helpers/my-types';


export default defineComponent({
  name: 'HomeView',
  components: {
    BigIcons, ImageSlide, MainProducts,MainFooter
  },
  setup() {
    const pStore = productStore();
    const { products,numberOfElements,pageNum } = storeToRefs(pStore);
    return {
      products,numberOfElements,pageNum, pStore
    }
  },
  methods: {
    async getAllProducts(){
      await this.pStore.getProducts();

    },
    async getProductsPages(data: ProductsQuery) {
      await this.pStore.getProducts(data);
    }

  },

  created() {
    this.getAllProducts();
  },

})

</script>