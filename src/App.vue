<template>
  <div>
    <div>
      <NavBar />
    </div>
    <div>
      <AlertVue />
    </div>
    <div><router-view /></div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/Nav.vue'
import AlertVue from '@/components/Alert.vue'
</script>