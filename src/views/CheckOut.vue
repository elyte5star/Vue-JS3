<template>
    <div id="checkout" class="container">
        <div class="row">HELLO

        </div>
    </div>
</template>
<script lang="ts">



import { useRoute } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Checkout",
    setup(props, ctx) {
        const route = useRoute();
        const c: any = route.query.bookingDetails;
        console.log(JSON.parse(c));

    },

})

</script>