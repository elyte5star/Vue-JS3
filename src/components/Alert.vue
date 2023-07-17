<template>
    <div v-if="alert" class="container">
        <div class="m-3" id="alert1">
            <div id="alert1" :class="'alert alert-dismissable  fade show ' + alertstore.alert?.type" role=alert>
                <strong>{{ alert.message }}</strong>
                <button v-if="alert.loading" class="btn btn-outline-dark btn-block" disabled>
                    <span class="spinner-border spinner-border-lg"></span>
                    <span class="spinner-grow spinner-grow-lg"></span>
                    Loading..
                </button>
                <button v-else @click="alertstore.reset()" class="btn btn-link close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia';
import { userAlertStore } from '@/stores/alert'


export default defineComponent({
    name: 'AlertVue',
    setup(props, ctx) {
        const alertstore = userAlertStore()
        const { alert } = storeToRefs(alertstore);
        return {
            alert, alertstore
        }
    },


})

</script>


