<template>
    <div id="add_entry" class="add_entry">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <form @submit.prevent="registerUser">
                        <div class="text-center mb-3">
                            <p>Sign up with:</p>
                            <button v-on:click.prevent="msoftCreateAccount" type="button"
                                class="btn btn-link btn-floating mx-1">
                                <i class="fa fa-windows"></i>
                            </button>
                            <button v-on:click.prevent="googleCreateAccount" type="button"
                                class="btn btn-link btn-floating mx-1">
                                <i class="fa fa-google"></i>
                            </button>
                        </div>

                        <p class="text-center">or:</p>
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
                                Your password must be 5-20 characters long, contain letters and numbers, and must
                                not contain spaces, special characters, or emoji.
                            </div>
                        </div>

                        <!-- Repeat Password input -->
                        <div class="form-outline mb-4">
                            <label class="form-label" for="registerRepeatPassword">Repeat password:</label>
                            <input v-on:keyup="checkIfpasswordMatch" v-model="registerRepeatPassword" type="password" id="registerRepeatPassword"
                                class="form-control" aria-describedby="passwordHelpBlock" autocomplete="on" />
                            <a href="javascript:void(0)"
                                @click="showPassword('registerRepeatPassword', 'toggleRegisterRepeatPassword')"><i
                                    class="bi bi-eye-slash" id="toggleRegisterRepeatPassword"></i></a>
                            <div id="passwordHelpBlock" class="form-text">
                                Your password must be 5-20 characters long, contain letters and numbers, and must
                                not contain spaces, special characters, or emoji.
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
import { googleProvider } from '@/helpers/gmailAuthConfig'
import { is_Input_Error, showPassword } from '@/helpers/script'
import { userStore } from '@/stores/userAccount'
import { loginRequest, _msalInstance } from '@/helpers/msoftAuthConfig'
import { defineComponent } from 'vue'
import type { AccountInfo } from '@azure/msal-browser'
import type { CloudLogin, Registration } from '@/helpers/my-types'
import { userAuthStore } from '@/stores/auth_store'
import { productStore } from '@/stores/products'
import { storeToRefs } from 'pinia'

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
            user_store:userStore()
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
        async googleCreateAccount(): Promise<void> {
            const login = googleProvider.useGoogleLogin({
                flow: 'implicit',
                onSuccess: (tokenResponse) =>  this.sendGmailToken(tokenResponse.access_token),
                onError: (err) => this.authStore.alert.error(`Failed to login with google: ${err}`)
            })
            login();
        },
        async sendGmailToken(tokenStr:string){
            try {
                const data: CloudLogin = {
                    authType: 'GMAIL',
                    token: tokenStr
                }
                await this.authStore.cloudLogin(data)
            } catch (error) {
                this.authStore.alert.error(`error during Gmail token validation: ${error}`)
            }

        },
        async msoftCreateAccount(): Promise<void> {
            try {
                //await this.msalInstance.handleRedirectPromise()
                await this.msalInstance.loginPopup(loginRequest)
                const accounts = this.msalInstance.getAllAccounts()
                if (accounts.length === 0) {
                    return this.msalInstance.loginRedirect(loginRequest)
                }
                const account: AccountInfo = accounts[0]
                const data: CloudLogin = {
                    authType: 'MSOFT',
                    token: account.idToken
                }
                await this.authStore.cloudLogin(data)
            } catch (error) {
                this.authStore.alert.error(`error during authentication: ${error}`)
            }
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
