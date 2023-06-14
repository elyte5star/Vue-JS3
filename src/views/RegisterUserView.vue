<template>
    <div >
        <div id="add_entry">
            <ul class="nav nav-justified mb-3"  role="tablist">
                <li class="nav-item" role="presentation">
                    <router-link :to="{ name: 'Login' }">Login</router-link>
                </li>
            </ul>
            <form @submit.prevent="registerUser">
                <div class="text-center mb-3">
                    <p>Sign up with:</p>
                    <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fa fa-windows"></i>
                    </button>
                    <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fa fa-google"></i>
                    </button>

                </div>

                <p class="text-center">or:</p>

                <!-- Username input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="registerUsername">Username</label>
                    <input type="text" id="registerUsername" class="form-control" />
                </div>

                <!-- Email input -->
                <div class="form-outline mb-4">
                    <label class="form-label" for="registerEmail">Email</label>
                    <input type="email" id="registerEmail" class="form-control" />
                </div>

                <!-- Password input -->
                <p class="form-outline mb-4">
                    <label class="form-label" for="registerPassword">Password</label>
                    <input type="password" id="registerPassword" class="form-control" />
                </p>

                <!-- Repeat Password input -->
                <p class="form-outline mb-4">
                    <label class="form-label" for="registerRepeatPassword">Repeat password</label>
                    <input type="password" id="registerRepeatPassword" class="form-control" />  
                </p>
                <!-- Telephone input -->
                <p class="form-outline mb-4">
                    <label class="form-label" for="registerTel">Telephone</label>
                    <input type="tel" id="registerTel" class="form-control" /> 
                </p>

                <!-- Checkbox -->
                <div class="form-check d-flex justify-content-center mb-4">
                    <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked />
                    <label class="form-check-label" for="registerCheck">I have read and agree to the terms</label>
                </div>
                <!-- Submit button -->
                <button type="submit" class="btn btn-primary btn-block mb-3">Sign in</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">

import { is_Input_Error } from '@/helpers/script';
import { userStore } from "@/stores/userAccount";

export default {
    name: 'RegisterUser',
    methods: {

        async registerUser() {
            const userName = (<HTMLInputElement>document.getElementById("registerUsername")).value;
            const email = (<HTMLInputElement>document.getElementById("registerEmail")).value;
            const password1 = (<HTMLInputElement>document.getElementById("registerPassword")).value;
            const passWord2 = (<HTMLInputElement>document.getElementById("registerRepeatPassword")).value;
            const tel = (<HTMLInputElement>document.getElementById("registerTel")).value;
            if (!is_Input_Error(userName, email, password1, passWord2, tel)) {
                const user = { "username": userName, "email": email, "password": password1, "telephone": tel };
                const user_store = userStore();
                await user_store.signUP(user);
            }

        }
    },
    mounted: function () {
        (<HTMLInputElement>document.getElementById("registerUsername")).value = "";
        (<HTMLInputElement>document.getElementById("registerEmail")).value = "";
        (<HTMLInputElement>document.getElementById("registerPassword")).value = "";
        (<HTMLInputElement>document.getElementById("registerRepeatPassword")).value = "";
        (<HTMLInputElement>document.getElementById("registerTel")).value = "";
    }
}

</script>