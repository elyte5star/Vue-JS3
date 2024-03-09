<template>
  <div>
      <NavBar :version="version" />
      <AlertVue />
    <router-view />
    <Loading></Loading>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/Nav.vue'
import Loading from './components/Loading.vue'
import { version } from 'vue'
import AlertVue from '@/components/Alert.vue'
</script>