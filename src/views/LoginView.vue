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
                                <button v-on:click.prevent="msoftLogin" type="button"
                                    class="btn btn-link btn-floating mx-1">
                                    <i class="fa fa-windows"></i>
                                </button>
                                <button v-on:click.prevent="googleLogin" type="button"
                                    class="btn btn-link btn-floating mx-1">
                                    <i class="fa fa-google"></i>
                                </button>
                                <button v-on:click.prevent="gitLogin" type="button" class="btn btn-link btn-floating mx-1">
                                    <i class="fa fa-github"></i>
                                </button>
                                <button v-on:click.prevent="twitterLogin" type="button"
                                    class="btn btn-link btn-floating mx-1">
                                    <i class="fa fa-twitter"></i>
                                </button>
                            </div>

                            <p class="text-center">or:</p>
                            <!-- Username input -->
                            <div class="form-outline">
                                <label class="form-label" for="loginUsername">Username:</label>
                                <input type="text" id="loginUsername" v-model="username" class="form-control"
                                    aria-describedby="usernameHelpBlock" maxlength="20" />
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
                                <input type="password" name="password" id="password" v-model="password" class="form-control"
                                    aria-describedby="passwordHelpBlock" autocomplete="on" maxlength="20" />
                                <a href="javascript:void(0)" @click="showPassword('password')"><i class="bi bi-eye-slash"
                                        id="toggleLoginPassword"></i></a>
                                <div id="passwordHelpBlock" class="form-text">
                                    Your password must be 5-20 characters long, contain letters and numbers, and must
                                    not
                                    contain spaces, special characters, or emoji.
                                </div>
                            </div>
                            <div id="forgetget_password"><a href="#!">Forgot password?</a></div>

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
                                <h3><a href="mailto:elyte5star@gmail.com"><i class="fa fa-envelope-o"></i>
                                        elyte5star@gmail.com</a></h3>
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
import { storeToRefs } from 'pinia';
import { googleOneTap, decodeCredential } from "vue3-google-login"
import { isUserNameValid, showPassword } from "@/helpers/script";
import { loginRequest, _msalInstance } from "@/helpers/msoftAuthConfig";
import { defineComponent } from 'vue'

export default defineComponent({
    name: "LoginView",
    data() {
        return {
            user: {}, msalInstance: _msalInstance, username: "", password: "", showPassword, authStore: userAuthStore(),
        }
    },
    watch: {
        async user(newVal) {

            console.log(newVal, "this changed");

        }
    },
    methods: {

        async googleLogin() {
            try {
                const loginResponse = await googleOneTap();
                const userData: any = decodeCredential(loginResponse.credential)
                await this.authStore.cloudLogin({ userid: userData.sub, email: userData.email, username: userData.name })

            } catch (error) {

                console.error(`error during authentication: ${error}`);
            }


        },
        async gitLogin() {

            console.error('git error during authentication:');

        },
        async twitterLogin() {

            console.error('twitter error during authentication:');

        },
        async msoftLogin() {
            try {
                await this.msalInstance.loginPopup(loginRequest);
                const accounts = this.msalInstance.getAllAccounts();
                if (accounts.length === 0) {
                    return;
                }
                const account = accounts[0]
                const userData = { userid: account.localAccountId, email: account.username, username: account.name }
                await this.authStore.cloudLogin(userData);

            } catch (error) {

                console.error(`error during authentication: ${error}`);
            }

        },
        async SignOut() {
            await this.msalInstance.logout({});
        },
        async onSubmitLogin() {

            if (isUserNameValid(this.username) && this.password) {
                let form = new FormData();
                form.append("username", this.username);
                form.append("password", this.password);
                const userData = new URLSearchParams();
                for (const [key, value] of form) {
                    userData.append(key, value);
                }

                await this.authStore.login(userData);
                this.username = "";
                this.password = "";

            } else {

                if (!this.password) this.authStore.alert.error("Password required!");
                if (!isUserNameValid(this.username)) this.authStore.alert.error("Invalid username!");


            }
        }

    },
    async created() {
        await this.msalInstance.handleRedirectPromise();
    },
    async mounted() {
        const { user } = storeToRefs(this.authStore);
        this.user = user
    },


});
</script>