<template>
  <div>
    <div>
      <NavBar :version="version" />
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/Nav.vue'
import { version } from 'vue'
</script>