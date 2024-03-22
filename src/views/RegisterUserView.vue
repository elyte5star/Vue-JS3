<template>
    <div id="add_entry" class="add_entry">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <form @submit.prevent="registerUser">
                        <p  class="text-center">New Account Registration Form</p>
                        <!-- Username input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="registerUsername">Username:</label>
                            <input v-model="registerUsername" type="text" id="registerUsername" class="form-control"
                                aria-describedby="usernameHelpBlock" />
                            <div id="usernameHelpBlock" class="form-text">
                                Usernames must be 5-20 and can only have: - Lowercase Letters(a-z) - Numbers(0-9) -
                                Dots(.) - Underscores(_)
                            </div>
                        </div>

                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="registerEmail">Email:</label>
                            <input v-model="registerEmail" type="email" id="registerEmail" class="form-control" />
                        </div>
                        <!-- Password input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="registerPassword">Password:</label>
                            <input v-model="registerPassword" type="password" id="registerPassword" class="form-control"
                                aria-describedby="passwordHelpBlock" autocomplete="on" />
                            <a href="javascript:void(0)"
                                @click="showPassword('registerPassword', 'toggleRegisterPassword')"><i
                                    class="bi bi-eye-slash" id="toggleRegisterPassword"></i></a>
                            <div id="passwordHelpBlock" class="form-text">
                                Password must be at least 8 characters in length, must contain at least 1 uppercase characters.
                                must contain at least 1 digit characters, must contain at least 1 special characters.
                            </div>
                        </div>

                        <!-- Repeat Password input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="registerRepeatPassword">Repeat password:</label>
                            <input v-on:keyup="checkIfpasswordMatch" v-model="registerRepeatPassword" type="password"
                                id="registerRepeatPassword" class="form-control" aria-describedby="passwordHelpBlock"
                                autocomplete="on" />
                            <a href="javascript:void(0)"
                                @click="showPassword('registerRepeatPassword', 'toggleRegisterRepeatPassword')"><i
                                    class="bi bi-eye-slash" id="toggleRegisterRepeatPassword"></i></a>
                            <div id="passwordHelpBlock" class="form-text">
                                Password must be at least 8 characters in length, must contain at least 1 uppercase characters.
                                must contain at least 1 digit characters, must contain at least 1 special characters.
                            </div>
                        </div>
                        <!-- Telephone input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="registerTel">Telephone:</label>
                            <input v-model="registerTel" type="tel" id="registerTel" class="form-control" />
                        </div>

                        <!-- Submit button -->
                        <button type="submit" class="btn btn-primary btn-block mb-3">Create account</button>
                        <!-- Login button -->
                        <div class="text-center">
                            <p>Already a member? <router-link :to="{ name: 'Login' }">Login</router-link></p>
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
                            <h3>
                                <a href="mailto:elyte5star@gmail.com"><i class="fa fa-envelope-o"></i>
                                    elyte5star@gmail.com</a>
                            </h3>
                            <h3>
                                <a href="https://github.com/elyte5star"><i class="fa fa-github"></i> elyte5star</a>
                            </h3>
                            <span class="small">
                                Please contact with us if you have any questions. We are avalible 24h.
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { is_Input_Error, showPassword } from '@/helpers/script'
import { userStore } from '@/stores/userAccount'
import { _msalInstance } from '@/helpers/msoftAuthConfig'
import { defineComponent } from 'vue'
import type { Registration } from '@/helpers/my-types'
import { userAuthStore } from '@/stores/auth_store'
import { productStore } from '@/stores/products'
import { storeToRefs } from 'pinia';

export default defineComponent({
    name: 'RegisterUser',
    setup() {
        const pStore = productStore()
        const { products } = storeToRefs(pStore)
        return { products, pStore }
    },
    data() {
        return {
            msalInstance: _msalInstance,
            registerTel: null,
            registerRepeatPassword: null,
            registerPassword: null,
            registerEmail: null,
            registerUsername: null,
            showPassword,
            authStore: userAuthStore(),
            user_store: userStore()
        }
    },
    async created() {
        this.getAllProducts()
        this.handleMsalRedirect()
    },
    methods: {
        checkIfpasswordMatch() {
            if (this.registerPassword != this.registerRepeatPassword) {
                this.user_store.alertStore.error('Password does not match!');
            } else {
                this.user_store.alertStore.reset()
            }
        },
        async getAllProducts() {
            await this.pStore.getProducts()
        },
        async handleMsalRedirect() {
            await this.msalInstance.handleRedirectPromise()
        },

        async registerUser(): Promise<void> {
            if (
                !is_Input_Error(
                    this.registerUsername,
                    this.registerEmail,
                    this.registerPassword,
                    this.registerRepeatPassword,
                    this.registerTel
                )
            ) {
                const registerUser: Registration = {
                    username: this.registerUsername,
                    email: this.registerEmail,
                    password: this.registerPassword,
                    telephone: this.registerTel
                }
                const user_store = userStore()
                await user_store.signUP(registerUser)
                this.registerUsername = null
                this.registerEmail = null
                this.registerPassword = null
                this.registerRepeatPassword = null
                this.registerTel = null
                //(<HTMLInputElement>document.getElementById('alert1')).scrollIntoView();
            }
        }
    }
})
</script>
