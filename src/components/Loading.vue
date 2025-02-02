<template>
    <div v-if="isLoading" class="overlay">
        <div class="loader"></div>
    </div>
</template>
  
<script lang="ts">
import { mapState } from 'pinia'
import { loadingStore } from '@/stores/loading'
import { defineComponent } from 'vue'
export default defineComponent({
    computed: {
        ...mapState(loadingStore, ["isLoading"]),
    },
});
</script>
  
