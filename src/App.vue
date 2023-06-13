<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/Nav.vue'
import AlertVue from '@/components/Alert.vue'
</script>

<template>
  <div>
    <div>
      <NavBar />
    </div>
    <div>
      <AlertVue />
    </div>
    <router-view />
  </div>
</template>

