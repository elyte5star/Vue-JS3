<template>
    <div v-if="(disabled === 'true')">
        <div class="container">
            <!-- Instructions -->
            <div class="row">
                <div class="alert alert-success col-md-12" role="alert" id="notes">
                    <h4>NOTES</h4>
                    <ul>
                        <li><strong>Hello</strong></li>
                        <li><strong>Your account is not active! To Activate your account, enter your email click the
                                button below and you
                                will recieve a verification code on
                                your email.</strong></li>
                    </ul>
                </div>
            </div>
            <!-- Send Email -->
            <div class="row">
                <div class="col-md-12">
                    <div class="jumbotron text-center">
                        <form @submit.prevent="onSubmit1" class="send-email" id="send-email">
                            <div class="col-md-9 col-sm-12">
                                <div class="form-group form-group-lg">
                                    <input v-model="email" id="verifyEmail" type="text" :disabled="emailSent"
                                        class="form-control col-md-6 col-sm-6 col-sm-offset-2" name="verifyEmail">
                                    <input :disabled="emailSent" class="btn btn-primary btn-lg col-md-2 col-sm-2"
                                        type="submit" value="Send Email">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- Verification Code Entry -->
            <div class="row">
                <div class="col-md-12">
                    <div class="text-center">
                        <form @submit.prevent="onSubmit2" class="verify-code" id="verify-code">
                            <div class="col-md-9 col-sm-12">
                                <div class="form-group form-group-lg">
                                    <input v-model="token" type="text" placeholder="Enter Verification Code"
                                        class="form-control col-md-6 col-sm-6 col-sm-offset-2" name="verifyCode"
                                        id="token">
                                    <input :disabled="!emailSent" class="btn btn-primary btn-lg col-md-2 col-sm-2"
                                        type="submit" value="Verify Code">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="ibox">
                <div class="ibox-title">
                    <h5>Support</h5>
                </div>
                <div class="ibox-content text-center">
                    <h3><i class="fa fa-phone"></i> +44 7482 06 7903</h3>
                    <h3><a href="mailto:elyte5star@gmail.com"><i class="fa fa-envelope-o"></i>
                            elyte5star@gmail.com</a></h3>
                    <h3><a href="https://github.com/elyte5star"><i class="fa fa-github"></i>
                            elyte5star</a></h3>
                    <span class="small">
                        Please contact with us if you have any questions. We are avalible 24h.
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { userStore } from "@/stores/userAccount";
import { storeToRefs } from 'pinia';
import { userAlertStore } from '@/stores/alert';
import { is_valid_Email } from '@/helpers/script';

export default {
    name: "SendEmail",
    setup() {
        const route = useRoute();
        const user_store = userStore();
        const { emailSent } = storeToRefs(user_store);
        const { locked, disabled } = route.query;
        return { emailSent, locked, disabled, user_store }
    },
    data() {
        return {
            email: null, isDisabled: true, token: null, alertStore: userAlertStore()
        }
    },
    methods: {
        async onSubmit1(): Promise<void> {
            if (this.email && is_valid_Email(this.email)) {
                await this.user_store.reSendOtpEmail(this.email);
            } else {
                (<HTMLInputElement>document.getElementById('verifyEmail')).focus();
                this.alertStore.error("Empty email Field");
            }

        },
        async onSubmit2(): Promise<void> {
            if (this.token) {
                await this.user_store.confirmEmailToken(this.token);
            } else {
                (<HTMLInputElement>document.getElementById('token')).focus();
                this.alertStore.error("Empty Token Field");
            }

        },

    },

}

</script>

<style scoped>
.jumbotron.text-center {
    height: 17em;
}

input.form-control.col-md-6 {
    width: 70%;
    margin-right: 1em;
    display: inline;
}

div#notes {
    margin-top: 2%;
    width: 98%;
    margin-left: 1%;
}

@media (min-width: 991px) {
    .col-md-9.col-sm-12 {
        margin-left: 12%;
    }
}
</style>