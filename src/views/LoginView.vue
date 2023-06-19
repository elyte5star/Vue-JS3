<template>
    <div>
        <!-- Login panel -->
        <div id="login_access" class="login_access">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <form @submit.prevent="onSubmitLogin" class="login-form" id="login_form">
                            <div class="text-center mb-3">
                                <p>Sign in with:</p>
                                <button v-on:click="getMsoftToken()" type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fa fa-windows"></i>
                                </button>
                                <button v-on:click="getGoogleToken()" type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fa fa-google"></i>
                                </button>
                            </div>

                            <p class="text-center">or:</p>
                            <!-- Username input -->
                            <div class="form-outline">
                                <label class="form-label" for="loginUsername">Username:</label>
                                <input type="text" id="loginUsername" v-model="username" class="form-control"
                                    aria-describedby="usernameHelpBlock" />
                                <div id="usernameHelpBlock" class="form-text">
                                    Usernames must be 5-20 and can only have:
                                    - Lowercase Letters(a-z)
                                    - Numbers(0-9)
                                    - Dots(.)
                                    - Underscores(_)
                                </div>

                            </div>

                            <!-- Password input -->
                            <div class="form-outline">
                                <label class="form-label" for="loginPassword">Password:</label>
                                <input type="password" id="loginPassword" v-model="password" class="form-control"
                                    aria-describedby="passwordHelpBlock" autocomplete="on" />
                                <div id="passwordHelpBlock" class="form-text">
                                    Your password must be 5-20 characters long, contain letters and numbers, and must
                                    not
                                    contain spaces, special characters, or emoji.
                                </div>
                                <!-- An element to toggle between password visibility -->
                                <input type="checkbox" :click="showPassword"> Show Password
                            </div>
                            <div><a href="#!">Forgot password?</a></div>

                            <!-- Submit button -->
                            <button type="submit" class="btn btn-primary">Sign in</button>

                            <!-- Register buttons -->
                            <div class="text-center">
                                <p>Not a member? <router-link :to="{ name: 'Register' }">Register</router-link></p>
                            </div>
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



<script lang="ts">
import { userAuthStore } from "@/stores/auth_store";

import { isUserNameValid } from "@/helpers/script";
import { userAlertStore } from '@/stores/alert';

export default {
    name: "LoginView",
    data() {
        return {
            username: "", password: ""
        }
    },
    methods: {
        showPassword() {
            console.log("SHOW password!!");

        },
        getGoogleToken() {

            console.log("Google is here");
        },
        getMsoftToken() {

            console.log("MSOFT is here");

        },
        async onSubmitLogin() {
            const alertStore = userAlertStore();
            if (isUserNameValid(this.username) && this.password) {
                let form = new FormData();
                form.append("username", this.username);
                form.append("password", this.password);
                const userData = new URLSearchParams();
                for (const [key, value] of form) {
                    userData.append(key, value);
                }
                const authStore = userAuthStore();
                await authStore.login(userData);
                this.username = "";
                this.password = "";

            } else {
                const alertStore = userAlertStore();
                if (!this.password) alertStore.error("Password required!");
                if (!isUserNameValid(this.username)) alertStore.error("Invalid username!");


            }
        }

    },



};
</script>