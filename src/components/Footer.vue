<template>
   
    <div>{{ isSorted }}</div>
   





</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { ProductsResponse } from '@/helpers/my-types';
export default defineComponent({
    name:'MainFooter',
    props:{
        productsRes:{ 
            type: Object as PropType<ProductsResponse>,
            required: true
            
        }
    },
    computed: {
        isSorted(){
            return this.productsRes?.sort;
        }
    }
    

});
</script>