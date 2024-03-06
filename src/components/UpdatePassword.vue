<template>
    <div class="container">
        <div class="row">
            <h1>Reset your password</h1>
            <form @submit.prevent="savePassword">
                <br/>
                    <label class="col-sm-2">Password:</label>
                    <span class="col-sm-5"><input v-model="password1" class="form-control" id="password" name="newPassword" type="password" value="" /></span>
                    <div class="col-sm-12"></div>
                <br/><br/>
                    <label class="col-sm-2">Confirm password</label>
                    <span class="col-sm-5"><input v-on:keyup="checkIfpasswordMatch" v-model="matchPassword" class="form-control" id="matchPassword" type="password" value="" /></span>
                <div class="col-sm-12"></div>
                <br/><br/>
                    <label class="col-sm-2">Your token is:</label>
                    <span class="col-sm-5"><input v-model="token" class="form-control" id="token" name="token"/></span>
                <div id="globalError" class="col-sm-12 alert alert-danger" style="display:none">Password does not match!</div> 
                <div class="col-sm-12">
                <br/><br/>
                <button class="btn btn-primary" type="submit">Update Password</button>
                </div>
            </form>  
        </div>
    </div>
</template>


<script lang="ts">
import { userStore } from "@/stores/userAccount";
export default {
    name:"UpdatePassword",
    data() {
        return{ password1:null,matchPassword:null,userStore: userStore()}
    },
    props: {
        token: {
            type:String, required: true
        }
    },

    methods: {
        changeActiveComponent(str: string) {
            this.$emit('changeActiveComponent', str);
        },
        checkIfpasswordMatch(){
            if(this.password1 != this.matchPassword){
                (<HTMLInputElement>document.getElementById("globalError")).style.display ='';

            }else{
                (<HTMLInputElement>document.getElementById("globalError")).style.display = 'none';
            }

        },
    
    savePassword(){
        
        if(this.password1 && this.matchPassword){

        }

    }

}

}


</script>