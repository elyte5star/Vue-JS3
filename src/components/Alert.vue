<template>
    <div v-if="alert" >
        <div class="m-3" id="alert1">
            <div id="alert1" :class="'text-center alert alert-dismissable  fade show ' + alert.type" role=alert>
                <strong>{{ alert.message }}</strong>
                <button @click="alertstore.reset()" class="btn btn-link close">
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
    setup() {
        const alertstore = userAlertStore()
        const { alert } = storeToRefs(alertstore);
        return {
            alert, alertstore
        }
    },


})

</script>


