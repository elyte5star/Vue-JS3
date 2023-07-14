<template>
  <div>
    <div>
      <NavBar />
    </div>
    <router-view />
  </div>
  <div>
    <AlertVue />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/Nav.vue'
import AlertVue from '@/components/Alert.vue'
</script>