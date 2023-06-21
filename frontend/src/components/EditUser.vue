<template>
    <div>
        <div id="update_entry" class="update_entry">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <form @submit.prevent="updateDetails">
                            <div class="text-center mb-3">
                                <div class="btn-group">
                                    <button @click="deleteUser(user_info.userid)" class="btn btn-danger" type="submit"
                                        id="delete_account"><i class="fa fa-trash-o"></i>
                                        Delete account</button>
                                    <button id="user_info" @click="changeActiveComponent('user_details')"
                                        class="btn btn-info"><i class="fa fa-user-circle"></i>
                                        User
                                        info</button>
                                </div>
                            </div>
                            <p class="text-center">or:</p>
                            <!-- Username input -->
                            <p>Modify user credentials:</p>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="editUsername">Username:</label>
                                <input v-model="editUsername" type="text" id="editUsername" class="form-control"
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
                                <label class="form-label" for="editEmail">Email:</label>
                                <input v-model="editEmail" type="email" id="editEmail" class="form-control" />
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="editPassword">Password:</label>
                                <input v-model="editPassword" type="password" id="editPassword" class="form-control"
                                    aria-describedby="passwordHelpBlock" autocomplete="on" />
                                <a href="javascript:void(0)" @click="showPassword('editPassword', 'toggleEditPassword')"><i
                                        class="bi bi-eye-slash" id="toggleEditPassword"></i></a>
                                <div id="passwordHelpBlock" class="form-text">
                                    Your password must be 5-20 characters long, contain letters and numbers, and must
                                    not
                                    contain spaces, special characters, or emoji.
                                </div>
                            </div>

                            <!-- Repeat Password input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="editRepeatPassword">Repeat password:</label>
                                <input v-model="editRepeatPassword" type="password" id="editRepeatPassword"
                                    class="form-control" />
                                <a href="javascript:void(0)"
                                    @click="showPassword('editRepeatPassword', 'toggleEditRepeatPassword')"><i
                                        class="bi bi-eye-slash" id="toggleEditRepeatPassword"></i></a>
                                <div id="passwordHelpBlock" class="form-text">
                                    Your password must be 5-20 characters long, contain letters and numbers, and must
                                    not
                                    contain spaces, special characters, or emoji.
                                </div>
                            </div>
                            <!-- Telephone input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="editTel">Telephone:</label>
                                <input v-model="editTel" type="tel" id="editTel" class="form-control" />
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
import { showPassword } from "@/helpers/script";


export default {
    name: 'EditUser',
    data() {

        return { editTel: '', editRepeatPassword: '', editPassword: '', editEmail: '', editUsername: '', showPassword }
    },
    props: {
        user_info: {
            type: Object, required: true
        }
    },
    methods: {
        changeActiveComponent(str: string) {
            this.$emit('changeActiveComponent', str);
        },
        async updateDetails() {
            console.log("Here to update");
        },
        async deleteUser(id: string) {
            const user_store = userStore();
            await user_store.deleteUserAccount(id);

        }

    },
    mounted() {
        this.editUsername = this.user_info.username;
        this.editTel = this.user_info.telephone;
        this.editEmail = this.user_info.email;
    },

}
</script>