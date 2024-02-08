<template>
    <div>
        <footer>
            <div class="contact">
                <span class="strong"><router-link :to="{ name: 'Contact' }" id="contact_us"><i class="fa fa-comments"> Customer
                                Service</i></router-link>:</span> | <i class="fa fa-phone"></i>
                +44 7482 06 7903 |
                <a href="mailto:elyte5star@gmail.com"><i class="fa fa-envelope-o"></i> elyte5star@gmail.com</a>
            </div>
        </footer>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'MainFooter'
});
</script>