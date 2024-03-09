<template>
    <div class="container">
        <div class="row">
            <h1>Reset your password</h1>
            <form @submit.prevent="savePassword">
                <br />
                <label class="col-sm-2">Password:</label>
                <span class="col-sm-5"><input v-on:keyup="checkIfpasswordMatch" v-model="password1" class="form-control" id="password" name="newPassword"
                        type="password" value="" /></span>
                <div class="col-sm-12"></div>
                <br /><br />
                <label class="col-sm-2">Confirm password</label>
                <span class="col-sm-5"><input v-on:keyup="checkIfpasswordMatch" v-model="matchPassword"
                        class="form-control" id="matchPassword" type="password" value="" /></span>
                <div class="col-sm-12"></div>
                <br /><br />
                <label class="col-sm-2">Your token is:</label>
                <span class="col-sm-5"><input :disabled="true" v-model="token" class="form-control" id="token"
                        name="token" /></span>
                <div id="globalError" class="col-sm-12 alert alert-danger" style="display:none">{{ errorMsg }}
                </div>
                <div class="col-sm-12">
                    <br /><br />
                    <button class="btn btn-primary" type="submit">Update Password</button>
                </div>
            </form>
        </div>
    </div>
</template>


<script lang="ts">
import type { PasswordChange } from "@/helpers/my-types";
import { userStore } from "@/stores/userAccount";
export default {
    name: "ChangePassword",
    data() {
        let urlParams = new URLSearchParams(window.location.search)
        return { errorMsg: 'Password does not match!', token: urlParams.get('resetToken'), password1: null, matchPassword: null, userStore: userStore() }
    },
    methods: {
        checkIfpasswordMatch() {
            if (this.password1 != this.matchPassword) {
                (<HTMLInputElement>document.getElementById("globalError")).style.display = '';
                this.errorMsg = 'Password does not match!';

            } else {
                (<HTMLInputElement>document.getElementById("globalError")).style.display = 'none';
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
                    (<HTMLInputElement>document.getElementById("globalError")).style.display = '';
                    this.errorMsg = 'Password Field Empty';
                }
            }

        }

    }

}


</script>