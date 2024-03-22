<template>
    <div v-if="token" id="change-pass" class="change-pass">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <form @submit.prevent="savePassword">
                        <p  class="text-center">Reset your password</p>
                        <div class="form-outline mb-4">
                            <label class="col-sm-2">Password:</label>
                            <input v-model="password1" class="form-control"
                                id="changePassword" name="newPassword" type="password" value="" />
                            <a href="javascript:void(0)"
                                @click="showPassword('changePassword', 'toggleChangePassword')"><i
                                    class="bi bi-eye-slash" id="toggleChangePassword"></i></a>
                            <div id="passwordHelpBlock" class="form-text">
                                Password must be at least 8 characters in length, must contain at least 1 uppercase characters.
                                must contain at least 1 digit characters, must contain at least 1 special characters.
                            </div>
                        </div>
                        <div class="form-outline mb-4">
                            <label class="col-sm-2">Repeat password</label>
                            <input v-on:keyup="checkIfpasswordMatch" v-model="matchPassword" class="form-control"
                                id="changePasswordRepeat" type="password" value="" />
                            <a href="javascript:void(0)"
                                @click="showPassword('changePasswordRepeat', 'toggleChangePasswordRepeat')"><i
                                    class="bi bi-eye-slash" id="toggleChangePassword"></i></a>
                            <div id="passwordHelpBlock" class="form-text">
                                Password must be at least 8 characters in length, must contain at least 1 uppercase characters.
                                must contain at least 1 digit characters, must contain at least 1 special characters.
                            </div>
                        </div>
                        <label class="col-sm-2">Your token is:</label>
                        <input :disabled="true" v-model="token" class="form-control" id="token" name="token" />
                        <br />
                        <div class="col-sm-12">
                            <button id="change-pass-btn" class="btn btn-primary" type="submit">Change Password</button>
                        </div>
                    </form>
                </div>
                <!--Grid column-->
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
import type { PasswordChange } from "@/helpers/my-types";
import { userStore } from "@/stores/userAccount";
import { showPassword } from '@/helpers/script'
export default {
    name: "ChangePassword",
    data() {
        let urlParams = new URLSearchParams(window.location.search)
        return { showPassword, errorMsg: 'Password does not match!', token: urlParams.get('resetToken'), password1: null, matchPassword: null, userStore: userStore() }
    },
    methods: {
        checkIfpasswordMatch() {
            if (this.password1 != this.matchPassword) {
                this.userStore.alertStore.error('Password does not match!');

            } else {
                this.userStore.alertStore.reset()
            }
        },
        savePassword() {
            if (this.password1 && this.matchPassword) {
                const payload: PasswordChange = {
                    password: this.password1,
                    resetToken: this.token
                }
                this.userStore.changePassword(payload)

            } else {
                if (!this.password1 || !this.matchPassword) {
                    this.userStore.alertStore.error('Password Field Empty');
                }
            }

        }

    }

}


</script>
