<template>
<div v-if="user_info">
    <div id="update-pass" class="update-pass">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <form @submit.prevent="savePassword">
                        <div class="text-center mb-3">
                            <div class="btn-group user-action">
                                <button @click.prevent="deleteUser(user_info.userid)" class="btn btn-danger" type="submit" id="delete_account"><i class="fa fa-trash-o"></i>
                                    DELETE ACCOUNT</button>
                                <button id="update_user_info" @click="changeActiveComponent('update_details')" class="btn btn-warning"><i class="fa fa-pencil-square-o"></i>
                                    UPDATE USER INFO
                                </button>
                                <button id="user_info" @click="changeActiveComponent('user_details')" class="btn btn-info"><i class="fa fa-user-circle"></i>
                                    BACK TO USER DETAILS
                                </button>
                            </div>
                        </div>
                        <p class="text-center">or:</p>
                        <p class="text-center">Update your password</p>
                        <div class="form-outline">
                            <label class="form-label" for="oldPassword">Old Password</label>
                            <input v-on:keyup="checkIfpasswordMatch" v-model="oldPassword" class="form-control" id="oldpass" name="oldPassword" type="password" />
                            <a href="javascript:void(0)" @click="showPassword('oldpass','toggleOldPassword')"><i class="bi bi-eye-slash" id="toggleOldPassword"></i></a>
                        </div>
                        <div class="form-outline">
                            <label class="form-label">New Password</label>
                            <input autocomplete="on" maxlength="20" aria-describedby="passwordHelpBlock" v-model.lazy="newPassword" class="form-control" id="update-password" name="newPassword" type="password" />
                            <a href="javascript:void(0)" @click="showPassword('update-password','toggleUpdatePassword')"><i class="bi bi-eye-slash" id="toggleUpdatePassword"></i></a>
                            <div id="passwordHelpBlock" class="form-text">
                                Your password must be 5-20 characters long, contain letters and numbers, and must not
                                contain spaces, special characters, or emoji.
                            </div>
                        </div>
                        <br />
                        <label class="col-sm-12">Confirm</label>
                        <div class="form-outline">
                            <input v-on:keyup="checkIfpasswordMatch" v-model="matchPassword" class="form-control" id="matchPassword" name="matchingPassword" type="password" />
                        </div>
                        <div class="col-sm-12">
                            <br />
                            <button class="btn btn-primary" type="submit">Update Password</button>
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
                    <div v-if="products" class="ibox">
                        <p class="font-bold">Products you may be interested</p>
                        <div id="recommendation_list" v-for="item in Array.prototype.slice.call(products, 1, 3)" v-bind:key="item.pid" class="ibox-content">
                            <div class="table-responsive">
                                <table class="table shoping-cart-table">
                                    <tbody>
                                        <tr>
                                            <td :style="{ width: '90px' }">
                                                <div class="cart-product-imitation">
                                                    <img :src="'../../src/assets/images/products/' + item.image" v-bind:alt="item.name" />
                                                </div>
                                            </td>
                                            <td class="desc">
                                                <h3>
                                                    <router-link :to="{ name: 'oneProduct', params: { pid: item.pid } }" class="text-navy">
                                                        {{ item.name }}
                                                    </router-link>
                                                </h3>
                                                <p class="small">
                                                    {{ item.details }}
                                                </p>
                                                <dl class="small m-b-none">
                                                    <dt>Description</dt>
                                                    <dd>{{ item.description }}</dd>
                                                </dl>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                  
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import type {
    Product,
    UpdateUserPassword,
    User
} from '@/helpers/my-types'
import {
    userStore
} from '@/stores/userAccount'
import type {
    PropType
} from 'vue'
import { showPassword } from '@/helpers/script'
export default {
    name: 'UpdatePassword',
    methods: {
        
        async deleteUser(userid: string) {
            await this.userStore.deleteUserAccount(userid)
        },
        changeActiveComponent(str: string) {
            this.$emit('changeActiveComponent', str)
        },
        checkIfpasswordMatch() {
            if (this.newPassword != this.matchPassword) {
                this.userStore.alertStore.error('Password does not match!');
            } else {
              this.userStore.alertStore.reset()
            }
        },
        savePassword() {
            if (this.newPassword && this.matchPassword && this.oldPassword) {
                const payload: UpdateUserPassword = {
                    newPassword: this.newPassword,
                    oldPassword: this.oldPassword
                }
                this.userStore.updatePassword(payload)
            } else {
                if (!this.newPassword || !this.matchPassword || this.oldPassword) {
                    this.userStore.alertStore.error('Password Field Empty');
                }
            }
        }
    },
    props: {
        user_info: {
            type: Object as PropType < User > ,
            required: true
        },
        products: {
            type: Array < Product > ,
            required: true
        }
    },
    data() {
        return {
            showPassword,
            matchPassword: null,
            oldPassword: null,
            newPassword: null,
            userStore: userStore()
        }
    }
}
</script>
