<template>
    <div>
        <div id="add_entry" class="add_entry">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <form @submit.prevent="registerUser">

                            <p class="text-center">Please Sign up:</p>

                            <!-- Username input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="registerUsername">Username:</label>
                                <input v-model="registerUsername" type="text" id="registerUsername" class="form-control"
                                    aria-describedby="usernameHelpBlock" />
                                <div id="usernameHelpBlock" class="form-text">
                                    Usernames must be 5-20 and can only have:
                                    - Lowercase Letters(a-z)
                                    - Numbers(0-9)
                                    - Dots(.)
                                    - Underscores(_)
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
                                    not
                                    contain spaces, special characters, or emoji.
                                </div>
                            </div>

                            <!-- Repeat Password input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="registerRepeatPassword">Repeat password:</label>
                                <input v-model="registerRepeatPassword" type="password" id="registerRepeatPassword"
                                    class="form-control" aria-describedby="passwordHelpBlock" autocomplete="on" />
                                <a href="javascript:void(0)"
                                    @click="showPassword('registerRepeatPassword', 'toggleRegisterRepeatPassword')"><i
                                        class="bi bi-eye-slash" id="toggleRegisterRepeatPassword"></i></a>
                                <div id="passwordHelpBlock" class="form-text">
                                    Your password must be 5-20 characters long, contain letters and numbers, and must
                                    not
                                    contain spaces, special characters, or emoji.
                                </div>
                            </div>
                            <!-- Telephone input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="registerTel">Telephone:</label>
                                <input v-model="registerTel" type="tel" id="registerTel" class="form-control" />
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

import { is_Input_Error, showPassword } from '@/helpers/script';
import { userStore } from "@/stores/userAccount";
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'RegisterUser',
    data() {
        return {
            registerTel: '', registerRepeatPassword: '', registerPassword: '', registerEmail: '', registerUsername: '', showPassword
        }
    },
    methods: {
        async registerUser() {
            if (!is_Input_Error(this.registerUsername, this.registerEmail, this.registerPassword, this.registerRepeatPassword, this.registerTel)) {
                const registerUser = { "username": this.registerUsername, "email": this.registerEmail, "password": this.registerPassword, "telephone": Number(this.registerTel) };
                const user_store = userStore();
                await user_store.signUP(registerUser);
                this.registerUsername = '';
                this.registerEmail = '';
                this.registerPassword = '';
                this.registerRepeatPassword = '';
                this.registerTel = '';
                (<HTMLInputElement>document.getElementById('alert1')).scrollIntoView();

            }

        }
    },

})

</script>