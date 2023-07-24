<template>
  <div>
    <div>
      <NavBar :version="version" />
    </div><br>
    <div>
      <AlertVue />
    </div>
    <router-view />
    <Loading></Loading>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AlertVue from '@/components/Alert.vue'
import NavBar from '@/components/Nav.vue'
import Loading from './components/Loading.vue'
import { version } from 'vue'
</script>