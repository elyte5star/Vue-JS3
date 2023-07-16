<template>
    <div v-if="alert" class="container">
        <div class="m-3" id="alert1">
            <div id="alert1" :class="'alert alert-dismissable  fade show ' + alertstore.alert?.type" role=alert>
                <strong>{{ alertstore.alert?.message }}</strong>
                <button @click="alertstore.reset()" class="btn btn-link close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { storeToRefs } from 'pinia';
import { userAlertStore } from '@/stores/alert'


export default {
    name: 'AlertVue',
    data(){
        
        return {
            alert: {}, alertstore: userAlertStore()
        }
    },
    mounted() {
        const { alert } = storeToRefs(this.alertstore);
        this.alert = alert;

    },

}

</script>


