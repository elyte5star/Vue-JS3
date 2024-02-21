
<template>
    <div v-if="user_info">
        <div id="update_entry" class="update_entry">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <form @submit.prevent="updateDetails">
                            <div class="text-center mb-3">
                                <div class="btn-group user-action">
                                    <button @click.prevent="deleteUser(user_info.userid)" class="btn btn-danger"
                                        type="submit" id="delete_account"><i class="fa fa-trash-o"></i>
                                        DELETE ACCOUNT</button>
                                    <button id="user_info" @click="resetPassword(user_info.email)"
                                        class="btn btn-warning"><i class="fa fa-key"></i>
                                       RESET PASSWORD
                                    </button>
                                    <button id="user_info" @click="changeActiveComponent('user_details')"
                                        class="btn btn-info"><i class="fa fa-user-circle"></i>
                                        BACK TO USER DETAILS
                                    </button>
                                </div>
                            </div>
                            <p class="text-center">or:</p>
                            <!-- Username input -->
                            <p>Modify user credentials:</p>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="editUsername">Username:</label>
                                <input :disabled="true" v-model="editUsername" type="text" id="editUsername" class="form-control"
                                    aria-describedby="usernameHelpBlock" />
                            </div>

                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="editEmail">Email:</label>
                                <input v-model="editEmail" type="email" id="editEmail" class="form-control" />
                            </div>

                
                            <!-- Telephone input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="editTel">Telephone:</label>
                                <input v-model="editTel" type="tel" id="editTel" class="form-control" maxlength="20" />
                            </div>


                            <!-- Submit button -->
                            <button type="submit" class="btn btn-primary btn-block mb-3">Modify account details</button>
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


import { userStore } from "@/stores/userAccount";
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { User } from "@/helpers/my-types";
import { userAlertStore } from '@/stores/alert';


export default defineComponent({
    name: 'EditUser',
    data() {

        return { editTel: " " || null,  editEmail:  " " || null, editUsername: " " || null, userStore: userStore(),alertStore: userAlertStore() }
    },
    props: {
        user_info: {
            type: Object as PropType<User>, required: true
        }
    },
    methods: {
        changeActiveComponent(str: string) {
            this.$emit('changeActiveComponent', str);
        },
        async resetPassword(email:string){
            await this.userStore.sendPasswordResetToken(email);
        },
        async updateDetails() {
            if (this.editUsername && this.editEmail && this.editTel) {
                const updateUserData = { email: this.editEmail, telephone: this.editTel}
                await this.userStore.updateUserById(this.user_info.userid, updateUserData);
                return;
            }
            this.alertStore.error("Telephone or email can not be empty!")

        },
        async deleteUser(userid: string) {
            await this.userStore.deleteUserAccount(userid);
        }

    },
    mounted() {
        this.editUsername = this.user_info.username;
        this.editTel = this.user_info.telephone;
        this.editEmail = this.user_info.email;
    },

})
</script>