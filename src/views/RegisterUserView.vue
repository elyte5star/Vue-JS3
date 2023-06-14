<template>
    <div>
        <div id="add_entry">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
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
                                <label class="form-label" for="registerUsername">Username:</label>
                                <input type="text" id="registerUsername" class="form-control" />
                            </div>

                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="registerEmail">Email:</label>
                                <input type="email" id="registerEmail" class="form-control" />
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="registerPassword">Password:</label>
                                <input type="password" id="registerPassword" class="form-control" />
                            </div>

                            <!-- Repeat Password input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="registerRepeatPassword">Repeat password:</label>
                                <input type="password" id="registerRepeatPassword" class="form-control" />
                            </div>
                            <!-- Telephone input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="registerTel">Telephone:</label>
                                <input type="tel" id="registerTel" class="form-control" />
                            </div>


                            <!-- Submit button -->
                            <button type="submit" class="btn btn-primary btn-block mb-3">Create account</button>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <div class="ibox">
                            <div class="ibox-title">
                                <h5>Support</h5>
                            </div>
                            <div class="ibox-content text-center">
                                <h3><i class="fa fa-phone"></i> +47 409 78 057</h3>
                                <h3><a href="mailto:checkuti@gmail.com"><i class="fa fa-envelope-o"></i>
                                        checkuti@gmail.com</a></h3>
                                <h3><a href="https://github.com/elyte5star"><i class="fa fa-github"></i> elyte5star</a></h3>
                                <span class="small">
                                    Please contact with us if you have any questions. We are avalible 24h.
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
form .fa {
    font-size: 30px;
    color: #3299BB;
    text-shadow: 4px 4px 4px #aaa;
}

label {
    color: #aaa;
    letter-spacing: 1px;
    margin: 0px;
    font-size: 0.6em;
    text-transform: uppercase;
    font-weight: bold;

}

form {
    text-align: left;
    padding: 20px;
    border-radius: 10px;
}

a {
    text-decoration: none;
}
</style>
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