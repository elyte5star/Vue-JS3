<template>
    <div id="admin">
        <div v-if="userLoggedIn.admin">
            <h1>Hi {{ userLoggedIn.username }}!</h1>
            <p>You're logged in as a superuser!</p>
            <p><router-link to="/users">Manage Users</router-link></p>
        </div>
    </div>
</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { userAuthStore } from '@/stores/auth_store';
const authStore = userAuthStore();
const { userLoggedIn } = storeToRefs(authStore);

</script>